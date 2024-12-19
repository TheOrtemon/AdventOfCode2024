import fs from "fs";
import { Coordinate, Grid, Direction } from "/mnt/d/ProgrammingProjects/aoc2024/coordinate";

// const [fileName, gridSize, bytes] = ["test_input.txt", 7, 12];
const [fileName, gridSize, bytes] = ["input.txt", 71, 1024];
const input = fs.readFileSync(fileName, "utf8").trim();

function getPrice(bytes: number): number {
  const grid: Grid<string> = new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill('.'));

  let pairNumber = 0;
  for (const pair of input.split("\n")) {
    if (pairNumber === bytes) {
      break;
    }
    const coordPair = pair
      .split(",")
      .map(Number);
    const coord = new Coordinate(coordPair[0], coordPair[1]);
    coord.setValueInGrid(grid, "#");
    pairNumber++;
  }

  const startCoord = new Coordinate(0, 0);
  const endCoord = new Coordinate(gridSize - 1, gridSize - 1);
  const q = [{curCoord: startCoord, curPrice: 0}];
  const been = new Set([startCoord.toString()]);

  while (q.length > 0) {
    const {curCoord, curPrice} = q.shift()!;
    if (curCoord.eq(endCoord)) {
      return curPrice;
    }
    for (const nextDir of Direction.dirs) {
      const newCoord = curCoord.add(nextDir);
      const newValue = newCoord.getValueFromGrid(grid);

      if (newValue === "." && !been.has(newCoord.toString())) {
        q.push({curCoord: newCoord, curPrice: curPrice + 1});
        been.add(newCoord.toString());
      }
    }
  }
  return -1;
}

function getLatestPrice(): number {
  let counter = 0;
  while (true) {
    const curPrice = getPrice(counter);
    if (curPrice === -1) {
      return counter;
    }
    counter++;
  }
}

const res1 = getPrice(bytes);
console.log("res1", res1);
const res2 = getLatestPrice();
const lines = input.split("\n");
console.log("res2", lines[res2 - 1]);
