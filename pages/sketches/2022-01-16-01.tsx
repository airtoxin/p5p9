import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  let g: P5.Graphics;
  const setup = (p5: P5) => {
    p5.background(255, 255, 255);
    p5.noLoop();
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();

    g = p5.createGraphics(p5.width, p5.height);
    g.background(255, 255, 255);
    g.noLoop();
    g.noFill();
    g.randomSeed(1);
    g.noiseSeed(1);
    g.smooth();
  };

  const size = 100;
  const draw = (p5: P5, utils: P5Utils) => {
    for (const [yLine, yi] of utils.enumerate(
      utils.shuffle(utils.getGrid(g.width, g.height, size))
    )) {
      for (const [
        {
          center: { x, y },
        },
        xi,
      ] of utils.enumerate(yLine)) {
        const diameter = g.noise(xi, yi) * size * 2;
        for (const d of utils.seq(
          Math.floor(diameter / 10) + 1,
          diameter,
          -10
        )) {
          g.random() < 0.5 ? g.strokeWeight(5.5) : g.strokeWeight(1);
          g.random() < 0.5 ? g.stroke(0) : g.stroke(255);
          g.circle(x, y, d);
        }
      }
    }

    for (const yLine of utils.getGrid(p5.width, p5.height, size)) {
      for (const grid of yLine) {
        p5.image(
          g,
          grid.start.x,
          grid.start.y,
          size,
          size,
          p5.random(0, p5.width),
          p5.random(0, p5.height),
          size,
          size
        );
      }
    }

    p5.push();
    p5.noStroke();
    p5.fill(0);
    utils.drawFrame(80);
    p5.pop();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
