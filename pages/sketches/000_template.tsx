import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255);
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    p5.stroke(0);
    p5.noFill();
    p5.noLoop();
  };

  const draw = (p5: P5, utils: P5Utils) => {};

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
