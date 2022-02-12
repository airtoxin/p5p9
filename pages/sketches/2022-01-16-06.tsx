import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawLine } from "../../HandDraw";

const colors = ["#00ffff", "#ff00ff", "#ffff00"];

const brush = (p5: P5, utils: P5Utils, from: P5.Vector, to: P5.Vector) => {
  const color: string = p5.random(colors);
  const direction = to.copy().sub(from);
  const vp1 = utils.rotateVector(direction, Math.PI / 2);
  const vp2 = utils.rotateVector(direction, -Math.PI / 2);
  const vDirection = vp2.copy().sub(vp1);
  const lines = utils
    .seq(21, -0.01, 0.002)
    .map(
      (i) =>
        new HandDrawLine(
          p5,
          utils,
          from.copy().sub(vDirection.copy().mult(i)),
          to.copy().sub(vDirection.copy().mult(i)),
          Math.floor(Math.sqrt(direction.x ** 2 + direction.y ** 2)) / 4
        )
    );

  return () => {
    p5.stroke(color);
    for (const line of lines) {
      line.draw();
    }
  };
};

const SketchPage: NextPage = () => {
  let brushes: (() => void)[];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.blendMode(p5.MULTIPLY);
    p5.background(255);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    brushes = utils.seq(1500).map(() => {
      const from = p5.createVector(
        p5.random(-p5.width * 0.3, p5.width * 1.3),
        p5.random(-p5.height * 0.3, p5.height * 1.3)
      );
      const to = from
        .copy()
        .add(p5.createVector(p5.random(-200, 200), p5.random(-200, 200)));
      return brush(p5, utils, from, to);
    });
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const brushDraw of brushes) {
      brushDraw();
    }
    p5.push();
    p5.blendMode(p5.BLEND);
    p5.stroke(255);
    p5.fill(255);
    utils.drawFrame(120);
    p5.pop();
  };
  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
