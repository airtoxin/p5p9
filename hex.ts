import P5 from "p5";
import { GridHex, P5Utils } from "./utils";

export type HexType = "pointy" | "flat";

const THETAS = [0, 1, 2, 3, 4, 5].map((i) => (Math.PI / 3) * i);
const RANGE6 = [0, 60, 120, 180, 240, 300];
const SQRT3 = Math.sqrt(3);

export class HexPoint {
  constructor(private p5: P5, private utils: P5Utils) {}
  private getDiff = (type: HexType): number => {
    if (type === "pointy") return Math.PI / 6;
    if (type === "flat") return 0;
    throw new Error(`Invalid hex type: ${type}`);
  };

  private product = (p: number, q: number): [number, number][] => {
    const l: [number, number][] = [];
    this.utils.seq(p).forEach((i) => {
      this.utils.seq(q).forEach((j) => {
        l.push([i, j]);
      });
    });
    return l;
  };

  hexCorners = (
    type: HexType,
    center: P5.Vector,
    size: number
  ): P5.Vector[] => {
    const diff = type === "pointy" ? 30 : 0;
    return RANGE6.map((baseDeg) => {
      const rad = (Math.PI / 180) * (baseDeg + diff);
      return this.p5.createVector(
        center.x + size * Math.cos(rad),
        center.y + size * Math.sin(rad)
      );
    });
  };

  gridPoint = (
    oType: HexType,
    offset: P5.Vector,
    size: number,
    gridX: number,
    gridY: number
  ): GridHex => {
    if (oType === "pointy") {
      const height = size * 2;
      const width = size * SQRT3;
      const diffXFromY = (gridY * width) / 2;
      const gridPointX = gridX * width + diffXFromY;
      const gridPointY = gridY * height * 0.75;

      const x = gridPointX + offset.x;
      const y = gridPointY + offset.y;
      const center = this.p5.createVector(x, y);
      const rowCol = this.p5.createVector(gridX, gridY);

      return {
        center,
        rowCol,
      };
    } else if (oType === "flat") {
      const width = size * 2;
      const height = size * SQRT3;
      const diffXFromY = gridY * width * 0.75;
      const gridPointX = gridX * width * 1.5 + diffXFromY;
      const gridPointY = (gridY * height) / 2;

      const x = gridPointX + offset.x;
      const y = gridPointY + offset.y;
      const center = this.p5.createVector(x, y);
      const rowCol = this.p5.createVector(gridX, gridY);

      return {
        center,
        rowCol,
      };
    } else {
      throw new Error(`Invalid hex type: ${oType}`);
    }
  };

  gridPoints = (
    oType: HexType,
    offset: P5.Vector,
    size: number,
    gridWidth: number,
    gridHeight: number
  ) =>
    this.product(gridHeight, gridWidth).map(([gridY, gridX]) =>
      this.gridPoint(oType, offset, size, gridX, gridY)
    );
}
