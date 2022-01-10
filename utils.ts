import P5 from "p5";

export type Grid = {
  start: P5.Vector;
  center: P5.Vector;
  end: P5.Vector;
  rowCol: P5.Vector;
};

export type GridHex = {
  center: P5.Vector;
  rowCol: P5.Vector;
};

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

    return this.seq(Math.floor(canvasHeight / gridSize)).map((yLine, yi) =>
      this.seq(Math.floor(canvasWidth / gridSize)).map((xLine, xi) => {
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
          rowCol: this.p.createVector(xi, yi),
        };
      })
    );
  }

  getHexagonGrid(
    radius: number,
    canvasSize: P5.Vector,
    margin: P5.Vector
  ): GridHex[] {
    const results: GridHex[] = [];

    const canvas = canvasSize.copy().sub(margin).sub(margin);

    const yRowPairs = Math.floor((canvas.y - 2 * radius) / (3 * radius));
    const yRows = yRowPairs * 2 + 1;
    const xCols = Math.floor(canvas.x / (Math.sqrt(3) * radius));

    const width = xCols * Math.sqrt(3) * radius;
    const height = 2 * radius + 3 * yRowPairs * radius;
    const offset = canvasSize.copy().sub(width, height).div(2);

    for (const y of this.seq(yRows)) {
      for (const x of this.seq(y % 2 === 1 ? xCols - 1 : xCols)) {
        const center = this.p
          .createVector(
            x * Math.sqrt(3) * radius,
            y * 2 * radius - (y * radius) / 2
          )
          .add(offset)
          .add(this.p.createVector((Math.sqrt(3) / 2) * radius, radius))
          .add(
            y % 2 === 1
              ? this.p.createVector((Math.sqrt(3) / 2) * radius, 0)
              : this.p.createVector()
          );
        const rowCol = this.p.createVector(x, y);
        results.push({ center, rowCol });
      }
    }

    return results;
  }

  private getGridPoint(
    offsetX: number,
    offsetY: number,
    size: number,
    gridX: number,
    gridY: number
  ): GridHex {
    const rowCol = this.p.createVector(gridX, gridY);
    const height = size * 2;
    const width = size * Math.sqrt(3);
    const diffXFromY = (gridY * width) / 2;
    const gridPointX = gridX * width + diffXFromY;
    const gridPointY = gridY * height * 0.75;

    const x = gridPointX + offsetX;
    const y = gridPointY + offsetY;
    const center = this.p.createVector(x, y);

    return {
      center,
      rowCol,
    };
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

    return this.seq(Math.floor(canvasDepth / gridSize)).map((zLine, zi) =>
      this.seq(Math.floor(canvasHeight / gridSize)).map((yLine, yi) =>
        this.seq(Math.floor(canvasWidth / gridSize)).map((xLine, xi) => {
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
            rowCol: this.p.createVector(xi, yi, zi),
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

  drawFrame(frameWeight: number): void {
    this.p.rect(0, 0, this.p.width, frameWeight);
    this.p.rect(0, 0, frameWeight, this.p.height);
    this.p.rect(0, this.p.height - frameWeight, this.p.width, frameWeight);
    this.p.rect(this.p.width - frameWeight, 0, frameWeight, this.p.height);
  }

  rotateVector(vector: P5.Vector, radians: number): P5.Vector {
    return this.p.createVector(
      Math.cos(radians) * vector.x - Math.sin(radians) * vector.y,
      Math.sin(radians) * vector.x + Math.cos(radians) * vector.y
    );
  }
}
