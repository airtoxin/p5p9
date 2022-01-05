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
