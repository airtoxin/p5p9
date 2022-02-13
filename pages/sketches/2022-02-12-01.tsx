import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { Grid, P5Utils } from "../../utils";
import { HandDrawCircle } from "../../HandDraw";

const palettes = ["#f1c3e2", "#c1e9fd", "#5e5993"];

const SketchPage: NextPage = () => {
  const noiseScale = 0.01;
  const size = 100;
  const gridCircles: (Grid & { circle: HandDrawCircle; color: string })[] = [];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255, 255, 255);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    gridCircles.push(
      ...utils.shuffle(
        utils
          .getGrid(p5.width, p5.height, size)
          .flat()
          .flatMap((grid) => {
            const maxDiameter =
              p5.noise(grid.center.x / noiseScale, grid.center.y / noiseScale) *
              size *
              2;
            return utils
              .seq(Math.floor(maxDiameter / 10) + 1, maxDiameter, -10)
              .flatMap((diameter) =>
                p5.random() < 0.5
                  ? []
                  : [
                      {
                        ...grid,
                        color: utils.shuffle(palettes)[0],
                        circle: new HandDrawCircle(
                          p5,
                          utils,
                          grid.center,
                          diameter / 2,
                          180,
                          p5.random(0, Math.PI * 2),
                          5
                        ),
                      },
                    ]
              );
          })
      )
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const { circle, color } of gridCircles) {
      p5.stroke(color);
      circle.draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
