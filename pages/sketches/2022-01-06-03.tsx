import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const setup = (p: P5) => {
    p.background(255, 255, 255);
    p.noLoop();
    p.noFill();
    p.randomSeed(1);
    p.noiseSeed(1);
    p.smooth();
  };

  const size = 50;
  const draw = (p: P5, utils: P5Utils) => {
    for (const [yLine, yi] of utils.enumerate(
      utils.shuffle(utils.getGrid(p.width, p.height, size))
    )) {
      for (const [
        {
          center: { x, y },
        },
        xi,
      ] of utils.enumerate(yLine)) {
        const diameter = p.noise(xi, yi) * size * 2;
        for (const d of utils.seq(
          Math.floor(diameter / 10) + 1,
          diameter,
          -10
        )) {
          p.random() < 0.5 ? p.strokeWeight(5.5) : p.strokeWeight(1);
          p.random() < 0.5 ? p.stroke(0) : p.stroke(255);
          p.circle(x, y, d);
        }
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
