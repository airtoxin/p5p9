import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawHexagon } from "../../HandDraw";

const SketchPage: NextPage = () => {
  const noiseScale = 0.01;
  const radius = 80;
  const drawingFrameCountOfEdge = 60;
  const drawTimes = 3;
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
        .flatMap((grid) => {
          const maxDiameter =
            p5.noise(grid.center.x / noiseScale, grid.center.y / noiseScale) *
            radius *
            2;

          return utils
            .seq(Math.floor(maxDiameter / 30) + 1, maxDiameter, -30)
            .flatMap((randomRadius) =>
              p5.random() < 0.5
                ? []
                : [
                    new HandDrawHexagon(
                      p5,
                      utils,
                      grid.center,
                      randomRadius,
                      drawingFrameCountOfEdge,
                      drawTimes
                    ),
                  ]
            );
        })
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
