import P5 from "p5";

export type Grid = { start: P5.Vector; center: P5.Vector; end: P5.Vector };

export class P5Utils {
  constructor(private p: P5) {}

  seq(count: number, from = 0, step = 1): number[] {
    return Array.from(Array(count)).map((_, i) => from + i * step);
  }

  slidingWindow<T>(items: T[], windowSize = 2): T[][] {
    const results: T[][] = [];
    for (const i of this.seq(items.length - windowSize + 1)) {
      results.push(items.slice(i, i + windowSize));
    }
    return results;
  }

  getGrid(
    canvasWidth: number,
    canvasHeight: number,
    gridSize: number
  ): Grid[][] {
    const xOffset = (canvasWidth % gridSize) / 2;
    const yOffset = (canvasHeight % gridSize) / 2;

    return this.seq(Math.floor(canvasHeight / gridSize)).map((yLine) =>
      this.seq(Math.floor(canvasWidth / gridSize)).map((xLine) => {
        const start = this.p.createVector(
          xOffset + xLine * gridSize,
          yOffset + yLine * gridSize
        );
        const center = this.p.createVector(
          start.x + gridSize / 2,
          start.y + gridSize / 2
        );
        const end = this.p.createVector(start.x + gridSize, start.y + gridSize);
        return {
          start,
          center,
          end,
        };
      })
    );
  }

  getGrid3d(
    canvasWidth: number,
    canvasHeight: number,
    canvasDepth: number,
    gridSize: number
  ): Grid[][][] {
    const xOffset = (canvasWidth % gridSize) / 2;
    const yOffset = (canvasHeight % gridSize) / 2;
    const zOffset = (canvasDepth % gridSize) / 2;

    return this.seq(Math.floor(canvasDepth / gridSize)).map((zLine) =>
      this.seq(Math.floor(canvasHeight / gridSize)).map((yLine) =>
        this.seq(Math.floor(canvasWidth / gridSize)).map((xLine) => {
          const start = this.p.createVector(
            xOffset + xLine * gridSize,
            yOffset + yLine * gridSize,
            zOffset + zLine * gridSize
          );
          const center = this.p.createVector(
            start.x + gridSize / 2,
            start.y + gridSize / 2,
            start.z + gridSize / 2
          );
          const end = this.p.createVector(
            start.x + gridSize,
            start.y + gridSize,
            start.z + gridSize
          );
          return {
            start,
            center,
            end,
          };
        })
      )
    );
  }

  enumerate<T>(items: T[]): [T, number][] {
    return items.map((item, i) => [item, i]);
  }

  shuffle<T>(items: T[]): T[] {
    const a = Array.from(items);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.p.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  radToVec(radians: number): P5.Vector {
    return this.p.createVector(Math.cos(radians), Math.sin(radians));
  }

  mapToColors(
    value: number,
    range: [number, number],
    target: [P5.Color, P5.Color]
  ): P5.Color {
    const r = this.p.map(
      value,
      range[0],
      range[1],
      this.p.red(target[0]),
      this.p.red(target[1])
    );
    const g = this.p.map(
      value,
      range[0],
      range[1],
      this.p.green(target[0]),
      this.p.green(target[1])
    );
    const b = this.p.map(
      value,
      range[0],
      range[1],
      this.p.blue(target[0]),
      this.p.blue(target[1])
    );
    const a = this.p.map(
      value,
      range[0],
      range[1],
      this.p.alpha(target[0]),
      this.p.alpha(target[1])
    );
    return this.p.color(r, g, b, a);
  }
}
