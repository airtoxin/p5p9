import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const noiseScale = 0.1;
  const gridSize = 20;
  const setup = (p: P5) => {
    p.pixelDensity(1);
    p.background(255, 255, 255);
    p.randomSeed(1);
    p.noiseSeed(1);
    p.noStroke();
    p.smooth();
  };

  const draw = (p: P5, utils: P5Utils) => {
    p.background(255);
    for (const yLine of utils.getGrid(p.width, p.height, gridSize)) {
      for (const grid of yLine) {
        p.fill(
          p.noise(
            (grid.center.x * noiseScale) / gridSize,
            (grid.center.y * noiseScale) / gridSize,
            (p.frameCount * noiseScale) / 10
          ) * 255
        );
        p.circle(grid.center.x, grid.center.y, gridSize);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
