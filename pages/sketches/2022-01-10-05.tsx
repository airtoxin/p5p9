import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawHexagon } from "../../HandDraw";

const SketchPage: NextPage = () => {
  const radius = 30;
  const drawingFrameCountOfEdge = 60;
  const drawTimes = 1;
  const hexagons: HandDrawHexagon[] = [];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255, 255, 255);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    hexagons.push(
      ...utils
        .getHexagonGrid(
          radius,
          p5.createVector(p5.width, p5.height),
          p5.createVector(40, 40)
        )
        .map(
          (g) =>
            new HandDrawHexagon(
              p5,
              utils,
              g.center,
              radius,
              drawingFrameCountOfEdge,
              drawTimes
            )
        )
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const hexagon of hexagons) {
      hexagon.draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
