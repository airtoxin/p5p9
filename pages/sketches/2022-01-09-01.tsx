import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const noiseScale = 0.02;
  const setup = (p: P5) => {
    p.pixelDensity(1);
    p.background(255, 255, 255);
    p.noLoop();
    p.noFill();
    p.randomSeed(1);
    p.noiseSeed(1);
    p.smooth();
  };

  const draw = (p: P5, utils: P5Utils) => {
    for (const y of utils.seq(Math.ceil(p.height))) {
      for (const x of utils.seq(Math.ceil(p.width))) {
        p.stroke(p.noise(x * noiseScale, y * noiseScale) * 255);
        p.point(x, y);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
