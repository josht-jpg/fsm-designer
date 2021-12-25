const isPathCurved = (x2: number, c1: number, y2: number, c2: number) =>
  x2 !== c1 || y2 !== c2;
export default isPathCurved;
