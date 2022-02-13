import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";
import { HandDrawHexagon } from "../../HandDraw";

const palettes = ["#f1c3e2", "#c1e9fd", "#5e5993"];

const SketchPage: NextPage = () => {
  const noiseScale = 0.01;
  const radius = 50;
  const drawingFrameCountOfEdge = 10;
  const drawTimes = 5;
  const hexagons: { hexagon: HandDrawHexagon; color: string }[] = [];
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
          p5.createVector(80, 80)
        )
        .flatMap((grid) => {
          const maxDiameter =
            p5.noise(grid.center.x / noiseScale, grid.center.y / noiseScale) *
            radius *
            2;

          return utils
            .seq(Math.floor(maxDiameter / 30) + 1, maxDiameter, -30)
            .flatMap((randomRadius) =>
              p5.random() < 0.3
                ? []
                : [
                    {
                      hexagon: new HandDrawHexagon(
                        p5,
                        utils,
                        grid.center,
                        randomRadius,
                        drawingFrameCountOfEdge,
                        drawTimes,
                        Math.floor(p5.random(0, drawingFrameCountOfEdge * 6))
                      ),
                      color: utils.shuffle(palettes)[0],
                    },
                  ]
            );
        })
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const { hexagon, color } of hexagons) {
      p5.stroke(color);
      hexagon.draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
