import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawLine } from "../../HandDraw";

const colors = ["#00ffff", "#ff00ff", "#ffff00"];

const SketchPage: NextPage = () => {
  const setup = (p5: P5, utils: P5Utils) => {
    p5.blendMode(p5.MULTIPLY);
    p5.background(255);
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    p5.noStroke();
    p5.noFill();
  };

  const draw = (p5: P5, utils: P5Utils) => {
    const x = p5.random(0, p5.width);
    const y = p5.random(0, p5.height);
    const diameter = p5.random(0, 100);
    const color: string = p5.random(colors);

    p5.fill(color);
    p5.circle(x, y, diameter);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
