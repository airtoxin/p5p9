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
    p.background(255, 255, 255);
    p.noFill();
    p.randomSeed(1);
    p.noiseSeed(1);
    p.smooth();
    p.strokeWeight(0.1);
    particles = utils
      .getGrid(p.width, p.height, gridSize)
      .flat()
      .map((grid) => ({ position: grid.center }));
    p.background(255, 255, 255, 10);
  };
  const draw = (p: P5, utils: P5Utils) => {
    for (const particle of particles) {
      const cx =
        (p.noise(
          (particle.position.x + 1) * noiseScale,
          particle.position.y * noiseScale
        ) -
          p.noise(
            (particle.position.x - 1) * noiseScale,
            particle.position.y * noiseScale
          )) /
        2;
      const cy =
        (p.noise(
          particle.position.x * noiseScale,
          (particle.position.y + 1) * noiseScale
        ) -
          p.noise(
            particle.position.x * noiseScale,
            (particle.position.y - 1) * noiseScale
          )) /
        2;
      particle.position.add(p.createVector(cy, -cx).mult(gridSize));

      p.point(particle.position.x, particle.position.y);
    }
    for (const i of utils.seq(400, 400, -1)) {
      if (p.frameCount === 4000 - i * 10) {
        p.push();
        p.fill(255);
        p.stroke(255);
        utils.drawFrame(i);
        p.pop();
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
