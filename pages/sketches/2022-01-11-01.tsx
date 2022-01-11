import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawLine } from "../../HandDraw";

const SketchPage: NextPage = () => {
  const noiseScale = 0.01;
  const lines: HandDrawLine[] = [];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    lines.push(
      ...utils
        .seq(Math.floor(p5.width / 10) + 1)
        .map(
          (x) =>
            new HandDrawLine(
              p5,
              utils,
              p5.createVector(x * 10, 100),
              p5.createVector(x * 10, p5.height - 100),
              200,
              1
            )
        )
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const line of lines) {
      line.draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
