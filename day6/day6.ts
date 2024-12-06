import fs from "fs";

// const input = fs.readFileSync("test_input.txt", "utf-8");
const input = fs.readFileSync("input.txt", "utf-8");
type Coord = [number, number];

const matrix1 = input.trim().split("\n").map(line => line.split(""));
const matrix2 = input.trim().split("\n").map(line => line.split(""));
let start: Coord = [-1, -1];
for (let y = 0; y < matrix1.length; y++) {
  for (let x = 0; x < matrix1[0].length; x++) {
    if (matrix1[y][x] == "^") {
      start = [x, y];
      break;
    }
  }
}
function getPoint(curPoint: Coord, dir: Coord, matrix: string[][]): string | undefined {
  const [curX, curY] = curPoint;
  const [dirX, dirY] = dir;
  const line = matrix[curY + dirY];
  if (line !== undefined) {
    return line[curX + dirX];
  }
}

function rotateDir(dir: Coord): Coord {
  const [x, y] = dir;

  if (x === 0 && y === -1) return [1, 0];
  if (x === 1 && y === 0) return [0, 1];
  if (x === 0 && y === 1) return [-1, 0];
  if (x === -1 && y === 0) return [0, -1];

  console.log(dir);
  throw new Error("Unreachable");
}

let curPoint: Coord = [...start];
let curDir: Coord = [0, -1];

while (getPoint(curPoint, curDir, matrix1) !== undefined) {
  if (getPoint(curPoint, curDir, matrix1) === "#") {
    curDir = rotateDir(curDir);
  } else {
    curPoint = [curPoint[0] + curDir[0], curPoint[1] + curDir[1]];
    matrix1[curPoint[1]][curPoint[0]] = "^";
  }
}

let res1 = 0;
for (let y = 0; y < matrix1.length; y++) {
  for (let x = 0; x < matrix1[0].length; x++) {
    if (matrix1[y][x] == "^") {
      res1 += 1;
    }
  }
}
console.log(res1);

let res2 = 0;
for (let y = 0; y < matrix2.length; y++) {
  for (let x = 0; x < matrix2[0].length; x++) {
    if (["#", "^"].includes(matrix2[y][x])) {
      continue;
    }
    matrix2[y][x] = "#";
    const been = new Set();
    curPoint = [...start];
    curDir = [0, -1];
    while (getPoint(curPoint, curDir, matrix2) !== undefined) {
      if (getPoint(curPoint, curDir, matrix2) === "#") {
        curDir = rotateDir(curDir);
        const pointStr = JSON.stringify([...curPoint, ...curDir]);
        if (been.has(pointStr)) {
          res2 += 1;
          // console.log(x, y);
          break; 
        }
        been.add(pointStr);
      } else {
        curPoint = [curPoint[0] + curDir[0], curPoint[1] + curDir[1]];
      }
    }
    matrix2[y][x] = ".";
  }
}
console.log(res2);

