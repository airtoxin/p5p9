import P5 from "p5";
import { P5Utils } from "./utils";

type Character = {
  chara: string;
  position: P5.Vector;
  paths: { x: number; y: number }[];
};

const noiseScale = 0.005;

export class HandDrawText {
  private counts: number = 0;
  private fontLoaded = false;
  private font: P5.Font;
  private characters: Character[] = [];
  constructor(
    private readonly p5: P5,
    private readonly utils: P5Utils,
    private readonly text: string,
    private readonly fontSize: number,
    private readonly fontPath: string,
    private readonly center: P5.Vector,
    private readonly times: number = 1
  ) {
    this.font = p5.loadFont(fontPath, () => {
      this.fontLoaded = true;
      const bounds: { x: number; y: number; w: number; h: number }[] = text
        .split("")
        .map((c) => this.font.textBounds(c, 0, 0, this.fontSize) as any);
      const textBoundWidth = bounds.reduce((sum, b) => sum + b.w, 0);
      const textBoundHeight = bounds.reduce((max, b) => Math.max(max, b.h), 0);
      let offsetX = this.center.x - textBoundWidth / 2;
      this.characters = text.split("").map((chara) => {
        const bound = this.font.textBounds(chara, 0, 0, this.fontSize) as any;
        const position = p5.createVector(
          offsetX + bound.w,
          this.center.y + textBoundHeight / 2
        );
        const paths = this.font.textToPoints(
          chara,
          position.x,
          position.y,
          this.fontSize,
          { simplifyThreshold: 0.1 }
        );
        offsetX += bound.w;
        return {
          chara,
          position,
          paths,
        };
      });
    });
  }

  draw() {
    if (!this.fontLoaded) return;
    this.counts++;
    for (const [chara, i] of this.utils.enumerate(this.characters)) {
      if (this.counts > chara.paths.length * this.times) continue;
      const nextChara = this.characters[i % this.characters.length];
      this.p5.push();
      this.p5.strokeWeight(
        this.p5.map(
          this.p5.noise(
            nextChara.position.x / noiseScale,
            nextChara.position.y / noiseScale
          ),
          0,
          1,
          1,
          3
        )
      );
      const fromPath = chara.paths[this.counts % chara.paths.length];
      const toPath = chara.paths[(this.counts + 1) % chara.paths.length];
      this.p5.line(fromPath.x, fromPath.y, toPath.x, toPath.y);
      this.p5.pop();
    }
  }
}

export class HandDrawCircle {
  private counts: number = 0;
  private position: P5.Vector;
  constructor(
    private readonly p5: P5,
    private readonly utils: P5Utils,
    private readonly center: P5.Vector,
    private radius: number,
    private readonly drawFrameCounts = 60,
    private radian: number = 0,
    private times: number = 1
  ) {
    this.position = this.getPosition();
  }

  draw() {
    this.counts++;
    if (this.counts > this.drawFrameCounts * this.times) return;

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
    const diffRadians = (Math.PI * 2) / this.drawFrameCounts;
    this.radian += diffRadians;
    this.radian += this.p5.random(-diffRadians, diffRadians);
  }

  private updateRadius() {
    this.radius += this.p5.random(
      -this.radius / this.drawFrameCounts,
      this.radius / this.drawFrameCounts
    );
  }

  private getPosition() {
    return this.p5
      .createVector(Math.cos(this.radian), Math.sin(this.radian))
      .mult(this.radius)
      .add(this.center);
  }
}

export class HandDrawHexagon {
  constructor(
    private readonly p5: P5,
    private readonly utils: P5Utils,
    private readonly center: P5.Vector,
    private readonly radius: number
  ) {}

  draw() {
    this.p5.push();
    this.p5.translate(this.center);
    for (const i of this.utils.seq(6)) {
      this.p5.line(
        0,
        -this.radius,
        (Math.sqrt(3) * this.radius) / 2,
        -this.radius / 2
      );
      this.p5.rotate(Math.PI / 3);
    }
    this.p5.pop();
  }
}
