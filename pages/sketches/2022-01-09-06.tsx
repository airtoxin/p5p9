import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

type Particle = {
  position: P5.Vector;
};

const SketchPage: NextPage = () => {
  const gridSize = 20;
  const noiseScale = 0.02;
  let particles: Particle[] = [];

  const setup = (p: P5, utils: P5Utils) => {
    p.blendMode(p.ADD);
    p.background(0);
    p.noFill();
    p.randomSeed(1);
    p.noiseSeed(1);
    p.smooth();
    p.strokeWeight(0.1);
    particles = utils
      .getGrid(p.width, p.height, gridSize)
      .flat()
      .map((grid) => ({ position: grid.center }));
  };
  const draw = (p: P5, utils: P5Utils) => {
    const getNoiseValue = (x: number, y: number) =>
      p.noise(x * noiseScale, y * noiseScale);
    for (const particle of particles) {
      const cx =
        (getNoiseValue(particle.position.x + 1, particle.position.y) -
          getNoiseValue(particle.position.x - 1, particle.position.y)) /
        2;
      const cy =
        (getNoiseValue(particle.position.x, particle.position.y + 1) -
          getNoiseValue(particle.position.x, particle.position.y - 1)) /
        2;
      particle.position.add(p.createVector(cy, -cx).mult(gridSize));

      p.stroke(
        utils.mapToColors(
          getNoiseValue(particle.position.x, particle.position.y),
          [0, 1],
          [p.color("#00304d"), p.color("#4d1019")]
        )
      );
      p.point(particle.position.x, particle.position.y);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
