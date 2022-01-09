import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const noiseScale = 0.1;
  const gridSize = 20;
  const setup = (p: P5) => {
    p.pixelDensity(1);
    p.randomSeed(1);
    p.noiseSeed(1);
    p.noFill();
    p.smooth();
  };

  const draw = (p: P5, utils: P5Utils) => {
    p.clear();
    for (const yLine of utils.getGrid(p.width, p.height, gridSize)) {
      for (const grid of yLine) {
        const { x, y } = utils.radToVec(
          p.noise(
            (grid.center.x * noiseScale) / gridSize,
            (grid.center.y * noiseScale) / gridSize,
            (p.frameCount * noiseScale) / gridSize
          ) *
            4 *
            Math.PI
        );
        p.point(
          grid.center.x + x * gridSize * 4,
          grid.center.y + y * gridSize * 4
        );
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
