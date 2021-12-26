import type { NextPage } from "next";
import { Sketch } from "../components/Sketch";
import P5 from "p5";

const range = (n: number) => Array.from(Array(n)).map((_, i) => i);

const drawRect = (p: P5, { x, y }: { x: number; y: number }) => {
  const random = Math.random();
  if (random < 0.5) {
    for (const i of range(20)) {
      p.line(x + i * 5, y, x + 100, y + i * 5);
      p.line(x + 100 - i * 5, y + 100, x, y + 100 - i * 5);
    }
  } else {
    for (const i of range(20)) {
      p.line(x + 100, y + i * 5, x + 100 - i * 5, y + 100);
      p.line(x, y + 100 - i * 5, x + i * 5, y);
    }
  }
};

const SketchPage: NextPage = () => {
  const setup = (p: P5) => {
    p.background(255, 255, 255);
    p.noLoop();
  };

  const draw = (p: P5) => {
    const paddingX = (p.width % 100) / 2 + 50;
    p.background(255, 255, 255);
    for (const loopY of range(7)) {
      for (const loopX of range(10)) {
        p.rect(paddingX + loopX * 100, 50 + loopY * 100, 100, 100);
        drawRect(p, { x: paddingX + loopX * 100, y: 50 + loopY * 100 });
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchPage;
