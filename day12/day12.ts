import fs from "fs";

function coordsToStr(point: Point): string {
  return `${point[0]},${point[1]}`;
}

const input = fs.readFileSync("input.txt", "utf8").trim();
// const input = fs.readFileSync("test_input.txt", "utf8").trim();
const matrix = input.split("\n").map(line => line.split(""));
const HEIGHT = matrix.length;
const WIDTH = matrix[0].length;

type Coord = string; // x,y
type Point = [number, number];
const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const regions: Array<Set<Coord>> = [];
const perimeters: Array<number> = [];
const sidePoints: Array<Set<Coord>> = [];

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const startPoint: Point = [x, y];
    const startPointStr = coordsToStr(startPoint);
    let found = false;
    regions.forEach(region => found ||= region.has(startPointStr));
    if (found) {
      continue;
    }
    const curChar = matrix[y][x];
    const newRegion = new Set([startPointStr]);
    const newSidePoints = new Set([startPointStr]);
    let newPerimeter = 0;
    const q = [startPoint];
    while (q.length > 0) {
      const prevPoint = q.shift()!;
      const [prevX, prevY] = prevPoint;
      DIRS.forEach(dir => {
        const [dx, dy] = dir;
        const newPoint: Point = [prevX + dx, prevY + dy];
        const [newX, newY] = newPoint;
        if (newX >= 0 && newX < WIDTH && newY >= 0 && newY < HEIGHT) {
          const nextChar = matrix[newY][newX];
          if (nextChar !== curChar) {
            newPerimeter++;
            newSidePoints.add(coordsToStr(prevPoint));
          } else if (!newRegion.has(coordsToStr(newPoint))) {
            newRegion.add(coordsToStr(newPoint));
            q.push(newPoint);
          }
        } else {
          newPerimeter++;
          newSidePoints.add(coordsToStr(prevPoint));
        }
      })
    }
    regions.push(newRegion);
    perimeters.push(newPerimeter);
    sidePoints.push(newSidePoints);
  }
}

const res1 = regions.map((region, i) => region.size * perimeters[i]).reduce((acc, cv) => acc + cv);
console.log({res1});


let res2 = 0;
for (const [regionId, regionSides] of sidePoints.entries()) {
  const dirSidesLen = DIRS.map(sideDir => {
    const regionCharPoint: Point = regionSides.values().next().value.split(",").map(Number);
    const regionChar = matrix[regionCharPoint[1]][regionCharPoint[0]];

    let sortedSides: Array<Point> = Array
      .from(regionSides)
      .map(s => s.split(",").map(Number) as Point)
      .filter(([x, y]) => {
        const [sideX, sideY] = [x + sideDir[0], y + sideDir[1]];
        return sideX < 0 || sideY < 0 || sideX >= WIDTH || sideY >= HEIGHT || matrix[sideY][sideX] !== regionChar
    });
    sortedSides.sort(([x1, y1], [x2, y2]) => {
      if (sideDir[1] !== 0) {
        if (y1 === y2) {return x1 - x2} 
        else {return y1 - y2}
      } else if (x1 === x2) {return y1 - y2} 
        else {return x1 - x2}
    })
    let sidesNum = 1;
    for (let i = 0; i < sortedSides.length - 1; i++) {
      const [head, tail] = [sortedSides[i], sortedSides[i + 1]];
      if (sideDir[1] === 0) {
        if (head[0] !== tail[0] || tail[1] - head[1] !== 1) {
          sidesNum++;
        } 
      } else if (head[1] !== tail[1] || tail[0] - head[0] !== 1) {
        sidesNum++;
      }
    }
    return sidesNum;
  }).reduce((acc, cv) => acc + cv);
  const regionSize = regions[regionId].size;
  res2 += regionSize * dirSidesLen;
}
console.log({res2})
