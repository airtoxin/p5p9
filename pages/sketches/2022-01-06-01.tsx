import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const setup = (p: P5) => {
    p.background(255, 255, 255);
    p.noLoop();
  };

  const padding = 50;
  const draw = (p: P5, utils: P5Utils) => {
    for (const yLine of utils.seq(Math.ceil(p.height / padding))) {
      for (const x of utils.seq(Math.ceil(p.width * 5), 0, 0.2)) {
        p.point(x, yLine * padding + p.noise(x, yLine) * padding);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
