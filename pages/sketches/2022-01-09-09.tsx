import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

type Particle = {
  position: P5.Vector;
};

const SketchPage: NextPage = () => {
  const gridSize = 6;
  const timeScale = 0.02;

  const setup = (p5: P5, utils: P5Utils) => {
    p5.randomSeed(1);
    p5.noiseSeed(1);

    p5.smooth();
    p5.noStroke();
  };

  const draw = (p5: P5, utils: P5Utils) => {
    p5.background(0);
    const grids = utils.getGrid(p5.width, p5.height, gridSize).flat();
    for (const grid of grids) {
      const d = p5.noise(
        grid.start.x * timeScale,
        grid.start.y * timeScale,
        p5.frameCount * timeScale
      );
      p5.fill(
        utils.mapToColors(d, [0, 1], [p5.color("#ff9c9c"), p5.color("#262677")])
      );
      if (d < 0.25) {
        p5.triangle(
          grid.start.x,
          grid.start.y,
          grid.end.x,
          grid.start.y,
          grid.start.x,
          grid.end.y
        );
      } else if (d < 0.5) {
        p5.triangle(
          grid.end.x,
          grid.start.y,
          grid.end.x,
          grid.end.y,
          grid.start.x,
          grid.start.y
        );
      } else if (d < 0.75) {
        p5.triangle(
          grid.end.x,
          grid.end.y,
          grid.start.x,
          grid.end.y,
          grid.end.x,
          grid.start.y
        );
      } else {
        p5.triangle(
          grid.start.x,
          grid.end.y,
          grid.start.x,
          grid.start.y,
          grid.end.x,
          grid.end.y
        );
      }
    }

    p5.fill(0);
    utils.drawFrame(30);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
