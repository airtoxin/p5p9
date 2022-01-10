import { NextPage } from "next";
import { Sketch } from "../../components/Sketch";
import P5 from "p5";
import { P5Utils } from "../../utils";

const SketchPage: NextPage = () => {
  const noiseScale = 0.0001;
  const circles: Circle[] = [];
  const setup = (p5: P5, utils: P5Utils) => {
    p5.background(255);
    p5.fill(0);
    p5.stroke(0);
    p5.randomSeed(1);
    p5.noiseSeed(1);
    circles.push(
      ...utils
        .getGrid(p5.width, p5.height, 100)
        .flat()
        .map(
          (grid) =>
            new Circle(
              p5,
              utils,
              grid.center,
              100 / 3,
              p5.random(0, Math.PI * 2)
            )
        )
    );
  };

  const draw = (p5: P5, utils: P5Utils) => {
    for (const circle of circles) {
      circle.draw();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

const noiseScale = 0.005;

class Circle {
  private readonly drawFrames = 60;
  private readonly startFrameCount: number;
  private position: P5.Vector;
  constructor(
    private readonly p5: P5,
    private readonly utils: P5Utils,
    private readonly center: P5.Vector,
    private radius: number,
    private radians: number = 0
  ) {
    this.startFrameCount = p5.frameCount;
    this.position = this.getPosition();
  }

  draw() {
    const frameCount = this.p5.frameCount - this.startFrameCount;
    if (frameCount > this.drawFrames * 20) return;

    this.updateRadians();
    this.updateRadius();
    const nextPosition = this.getPosition();
    this.p5.push();
    this.p5.strokeWeight(
      this.p5.map(
        this.p5.noise(nextPosition.x / noiseScale, nextPosition.y / noiseScale),
        0,
        1,
        1,
        3
      )
    );
    this.p5.line(
      this.position.x,
      this.position.y,
      nextPosition.x,
      nextPosition.y
    );
    this.p5.pop();
    this.position = nextPosition;
  }

  private updateRadians() {
    const diffRadians = (Math.PI * 2) / this.drawFrames;
    this.radians += diffRadians;
    this.radians += this.p5.random(-diffRadians, diffRadians);
  }

  private updateRadius() {
    this.radius += this.p5.random(
      -this.radius / this.drawFrames,
      this.radius / this.drawFrames
    );
  }

  private getPosition() {
    return this.p5
      .createVector(Math.cos(this.radians), Math.sin(this.radians))
      .mult(this.radius)
      .add(this.center);
  }
}

export default SketchPage;
