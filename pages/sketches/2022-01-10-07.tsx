import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawHexagon } from "../../HandDraw";

const SketchPage: NextPage = () => {
  const noiseScale = 0.01;
  const radius = 50;
  const drawingFrameCountOfEdge = 20;
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
            1.7;

          return utils
            .seq(Math.floor(maxDiameter / 10) + 1, maxDiameter, -10)
            .flatMap((randomRadius) =>
              p5.random() < 0.3
                ? []
                : [
                    new HandDrawHexagon(
                      p5,
                      utils,
                      grid.center,
                      randomRadius,
                      drawingFrameCountOfEdge,
                      Number.MAX_SAFE_INTEGER,
                      Math.floor(p5.random(0, drawingFrameCountOfEdge * 6))
                    ),
                  ]
            );
        })
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    if (p5.frameCount > 400) return;
    for (const hexagon of hexagons) {
      hexagon.draw();
    }
    for (const i of utils.seq(400, 400, -1)) {
      if (p5.frameCount === 400 - i) {
        p5.push();
        p5.fill(255);
        p5.stroke(255);
        utils.drawFrame(i);
        p5.pop();
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
