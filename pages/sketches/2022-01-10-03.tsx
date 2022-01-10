import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawText } from "../../HandDraw";

const SketchPage: NextPage = () => {
  let text: HandDrawText;
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255);
    p5.noFill();
    p5.stroke(0);
    p5.randomSeed(1);
    p5.noiseSeed(1);
    text = new HandDrawText(
      p5,
      utils,
      "abcdefg",
      100,
      "/ComforterBrush-Regular.ttf",
      p5.createVector(p5.width / 2, p5.height / 2),
      5
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    text.draw();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
