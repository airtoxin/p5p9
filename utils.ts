export type Point2D = { x: number; y: number };
export type Point3D = { x: number; y: number; z: number };
export type Grid = { start: Point2D; center: Point2D; end: Point2D };

export const seq = (count: number, from = 0, step = 1): number[] =>
  Array.from(Array(count)).map((_, i) => from + i * step);

export const slidingWindow = <T>(items: T[], windowSize = 2): T[][] => {
  const results: T[][] = [];
  for (const i of seq(items.length - windowSize + 1)) {
    results.push(items.slice(i, i + windowSize));
  }
  return results;
};

export const enumerate = <T>(items: T[]): [T, number][] =>
  items.map((item, i) => [item, i]);

export const getGrid = (
  canvasWidth: number,
  canvasHeight: number,
  gridSize: number
): Grid[][] => {
  const xOffset = (canvasWidth % gridSize) / 2;
  const yOffset = (canvasHeight % gridSize) / 2;

  return seq(Math.floor(canvasHeight / gridSize)).map((yLine) =>
    seq(Math.floor(canvasWidth / gridSize)).map((xLine) => {
      const start = {
        x: xOffset + xLine * gridSize,
        y: yOffset + yLine * gridSize,
      };
      return {
        start,
        center: { x: start.x + gridSize / 2, y: start.y + gridSize / 2 },
        end: { x: start.x + gridSize, y: start.y + gridSize },
      };
    })
  );
};

export const shuffle = <T>(items: T[], randomGen = Math.random): T[] => {
  const a = Array.from(items);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(randomGen() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
