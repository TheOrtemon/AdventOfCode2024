import fs from "fs";
import { Coordinate, Grid, Direction } from "/mnt/d/ProgrammingProjects/aoc2024/coordinate";
import { PriorityQueue } from "@datastructures-js/priority-queue";

const input = fs.readFileSync("input.txt", "utf8").trim();
// const input = fs.readFileSync("test_input.txt", "utf8").trim();
// const input = fs.readFileSync("test_input2.txt", "utf8").trim();

const grid = input.split("\n").map(line => line.split(""));
let start: Coordinate;
let end: Coordinate;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    const c = new Coordinate(x, y);
    switch (c.getValueFromGrid(grid)) {
      case "S":
        start = c;
        break;
      case "E":
        end = c;
        break;
      default:
        break;
    }
  }
}

interface Step {
  coord: Coordinate,
  price: number,
  direction: Direction,
  path: Coordinate[],
}

function traverseGrid(grid: Grid<string>, part2: boolean = false): number {
  const q: PriorityQueue<Step> = new PriorityQueue((a, b) => a.price - b.price);
  const beenMap: Map<string, number> = new Map();

  const startStep: Step = {coord: start, price: 0, direction: Direction.right, path: []};
  q.enqueue(startStep);
  beenMap.set(start.toString(), 0);
  let minPrice = Infinity;
  const winTiles: Set<string> = new Set();

  while (q.size() > 0) {
    const { coord, price, direction, path } = q.dequeue()!;
    const curDir = direction; // alias
    if (coord.eq(end)) {
      if (!part2) {
        return price;
      }
      if (!Number.isFinite(minPrice)) {
        minPrice = price;
      }
      if (price > minPrice) {
        break;
      }
      path.forEach(c => winTiles.add(c.toString()));
    }
    for (const newDir of Direction.dirs.filter(dir => !dir.isReversed(curDir))) {
      const newCoord = coord.add(newDir);
      const newPrice = price + 1 + Number(curDir.isPerpendicular(newDir)) * 1000;
      const prevPrice = beenMap.get(newCoord.toString()+newDir.toString()) || Infinity;
      if (prevPrice < newPrice || newCoord.getValueFromGrid(grid) === "#") {
        continue;
      }
      beenMap.set(newCoord.toString()+newDir.toString(), newPrice);
      const newPath = [...path, newCoord];
      const newStep = {coord: newCoord, price: newPrice, direction: newDir, path: newPath};
      q.enqueue(newStep);
    }
  }
  return winTiles.size + 1;
}

const res1 = traverseGrid(grid);
console.log({res1});
const res2 = traverseGrid(grid, true);
console.log({res2});
