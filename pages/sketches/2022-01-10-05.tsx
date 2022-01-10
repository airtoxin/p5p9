import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawHexagon } from "../../HandDraw";

const SketchPage: NextPage = () => {
  const radius = 50;
  const hexes: HandDrawHexagon[] = [];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255, 255, 255);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    hexes.push(
      ...utils
        .getHexagonGrid(
          radius,
          p5.createVector(p5.width, p5.height),
          p5.createVector(40, 40)
        )
        .map((g) => new HandDrawHexagon(p5, utils, g.center, radius))
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const hex of hexes) {
      hex.draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
