import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { Grid, P5Utils } from "../../utils";

type Particle = {
  position: P5.Vector;
};

const SketchPage: NextPage = () => {
  const size = 80;
  const gridSize = 20;
  const noiseScale = 0.02;
  let particles: Particle[] = [];

  let g: P5.Graphics;
  let grids: (Grid & {
    image: [number, number, number, number, number, number, number, number];
  })[][];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.blendMode(p5.ADD);
    p5.background(0);
    p5.noFill();
    p5.randomSeed(1);
    p5.noiseSeed(1);
    p5.smooth();
    p5.strokeWeight(0.1);
    particles = utils
      .getGrid(p5.width, p5.height, gridSize)
      .flat()
      .map((grid) => ({ position: grid.center }));

    g = p5.createGraphics(p5.width, p5.height);
    g.blendMode(g.ADD);
    g.background(0);
    g.noFill();
    g.randomSeed(1);
    g.noiseSeed(1);
    g.smooth();
    g.strokeWeight(0.1);
    grids = utils.getGrid(p5.width, p5.height, size).map((yLine) =>
      yLine.map((grid) => ({
        ...grid,
        image: [
          grid.start.x,
          grid.start.y,
          size,
          size,
          p5.random(0, p5.width - size),
          p5.random(0, p5.height - size),
          size,
          size,
        ],
      }))
    );
  };
  const draw = (p5: P5, utils: P5Utils) => {
    const getNoiseValue = (x: number, y: number) =>
      g.noise(x * noiseScale, y * noiseScale);
    for (const particle of particles) {
      const cx =
        (getNoiseValue(particle.position.x + 1, particle.position.y) -
          getNoiseValue(particle.position.x - 1, particle.position.y)) /
        2;
      const cy =
        (getNoiseValue(particle.position.x, particle.position.y + 1) -
          getNoiseValue(particle.position.x, particle.position.y - 1)) /
        2;
      particle.position.add(g.createVector(cy, -cx).mult(gridSize));

      g.stroke(
        utils.mapToColors(
          getNoiseValue(particle.position.x, particle.position.y),
          [0, 1],
          [g.color("#00304d"), g.color("#4d1019")]
        )
      );
      g.point(particle.position.x, particle.position.y);
    }

    p5.clear();
    for (const yLine of grids) {
      for (const grid of yLine) {
        p5.image(g, ...grid.image);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
