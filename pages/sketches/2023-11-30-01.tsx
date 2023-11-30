import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  let heights: number[] = [];

  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255, 255, 255);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    heights = Array.from(Array(
      Math.floor(p5.width) * Math.floor(p5.height)
    )).map(() => Math.floor(p5.random(0, 255)));
  };

  // Creepingで流出する砂の割合
  const D = 0.8;
  // Saltationで移動する砂の量
  const Q = 20;

  const draw = (p5: P5, utils: P5Utils) => {
    p5.clear();

    const nextHeights: number[] = [...heights];

    // 現状の描画と、Creepによる移動の計算
    heights.forEach((height, i) => {
      const w = Math.floor(p5.width);
      const h = Math.floor(p5.height);
      const x = i % Math.floor(w);
      const y = Math.floor(i / w);

      p5.stroke(height);
      p5.point(x, y);

      const x1 = (w + x + 1) % w;
      const x_1 = (w + x - 1) % w;
      const y1 = (h + y + 1) % h;
      const y_1 = (h + y - 1) % h;
      const orthogonals = (
        1/6 * D * (
          heights[x1 + y * w] +
          heights[x_1 + y * w] +
          heights[x + y1 * w] +
          heights[x + y_1 * w]
        ));
      const diagonals = (1/12 * D * (
        heights[x1 + y1 * w] +
        heights[x_1 + y_1 * w] +
        heights[x_1 + y1 * w] +
        heights[x1 + y_1 * w]
      ));

      nextHeights[i] = height - (D * height) + orthogonals + diagonals;
    });

    // Saltationによる移動の計算
    // Creepと同時に計算すると更新済み/未更新のnextHeightsが混ざってしまうので別のループで計算している
    heights.forEach((height, i) => {
      const w = Math.floor(p5.width);
      const h = Math.floor(p5.height);
      const x = i % Math.floor(w);
      const y = Math.floor(i / w);

      const L0 = 3; // 最低移動距離
      const L = Math.floor(L0 + 0.3 * height); // 高さに比例して飛距離は伸びる
      const saltationPos = ((w + x + L) % w) + y * w;
      nextHeights[i] -= Q;
      nextHeights[saltationPos] += Q
    });

    const min = Math.min(...nextHeights);
    const max = Math.max(...nextHeights);
    heights = nextHeights.map(h => p5.map(h, min, max, 0, 255));
  }

  return <Sketch setup={setup} draw={draw} size={[300, 300]}/>;
}

export default SketchPage;
