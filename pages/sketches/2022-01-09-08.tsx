import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

type Particle = {
  position: P5.Vector;
};

const SketchPage: NextPage = () => {
  const timeScale = 0.01;
  const p = 10;
  const r = 28;
  const b = 8 / 3;
  const linePoints: P5.Vector[] = [];

  const setup = (p5: P5, utils: P5Utils) => {
    linePoints.push(p5.createVector(0.01, 0, 0));
  };

  const draw = (p5: P5, utils: P5Utils) => {
    p5.background(0);
    p5.orbitControl();
    p5.scale(10);
    const nextFrom = linePoints.slice(-1)[0];
    const { x, y, z } = nextFrom;
    const dx = (-p * x + p * y) * timeScale;
    const dy = (-x * z + r * x - y) * timeScale;
    const dz = (x * y - b * z) * timeScale;
    const nextTo = nextFrom.copy().add(dx, dy, dz);
    linePoints.push(nextTo);

    p5.stroke(255, 255, 255, 200);
    for (const [from, to] of utils.slidingWindow(linePoints)) {
      p5.line(from.x, from.y, from.z, to.x, to.y, to.z);
    }
  };

  return <Sketch setup={setup} draw={draw} webgl />;
};

export default SketchPage;
