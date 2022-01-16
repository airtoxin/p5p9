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
    p5.noLoop();
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const color of colors) {
      p5.fill(color);

      const centerX = p5.width / 2 + p5.random(-50, 50);
      const centerY = p5.height / 2 + p5.random(-50, 50);
      const radiusBase = 300;

      p5.beginShape();
      for (const rad of utils.seq(3600, 0, (Math.PI * 2) / 3600)) {
        const r = radiusBase * Math.sin(rad * 20);
        p5.vertex(centerX + Math.cos(rad) * r, centerY + Math.sin(rad) * r);
      }
      p5.endShape();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
