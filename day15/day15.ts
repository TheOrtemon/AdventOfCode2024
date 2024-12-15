import fs from "fs";

// const input = fs.readFileSync("test_input.txt", "utf8").trim();
const input = fs.readFileSync("input.txt", "utf8").trim();

const [mapInput, steps] = input.split("\n\n");
const matrix = mapInput.split("\n").map(line => line.split(""));
const part2Map = {
  "@": "@.",
  "#": "##",
  "O": "[]",
  ".": "..",
};

const matrix2 = mapInput
  .split("\n")
  .map(line => line
    .split("")
    .flatMap(c => part2Map[c])
    .join("")
    .split("")
  );

let [startX, startY] = [-1, -1];
matrix.forEach((line, y) => line.forEach((c, x) => {
  if (c === "@") {startX = x; startY = y}
}))
let [startX2, startY2] = [-1, -1];
matrix2.forEach((line, y) => line.forEach((c, x) => {
  if (c === "@") {startX2 = x; startY2 = y}
}))
type Coord = [number, number];

const dirMap = {
  "v": [0, 1],
  ">": [1, 0],
  "<": [-1, 0],
  "^": [0, -1],
};

function moveInDirection(dir: Coord, curCoord: Coord): boolean {
  const [dx, dy] = dir;
  const [xi, yi] = curCoord;
  const [nextX, nextY] = [dx + xi, dy + yi];
  const nextChar = matrix[nextY][nextX];

  let flag: boolean;
  switch (nextChar) {
    case "#":
      flag = false;
      break;
    case "O":
      flag = moveInDirection(dir, [nextX, nextY]);
      break;
    default:
      flag = true;
      break;
  }
  if (flag) {
    matrix[nextY][nextX] = matrix[yi][xi];
    matrix[yi][xi] = ".";
  }
  return flag;
}

function checkDirection(dir: Coord, curCoord: Coord): boolean {
  const [dx, dy] = dir;
  const [xi, yi] = curCoord;
  const [nextX, nextY] = [dx + xi, dy + yi];
  const nextChar = matrix2[nextY][nextX];

  switch (nextChar) {
    case "#":
      return false;
    case "[":
    case "]":
      if (dx !== 0) {
        return checkDirection(dir, [nextX, nextY]);
      } else {
        const dx2 = nextChar === "[" ? 1 : -1;
        const nextX2 = nextX + dx2
        const res = checkDirection(dir, [nextX2, nextY]) && checkDirection(dir, [nextX, nextY]);
        return res;
      }
    default:
      return true;
  }
}

function move(dir: Coord, curCoord: Coord, recursed: boolean = false) {
  const [xi, yi] = curCoord;
  const curChar = matrix2[yi][xi];
if (curChar === ".") {
    return;
  }
  const [dx, dy] = dir;
  const [nextX, nextY] = [dx + xi, dy + yi];
  move(dir, [nextX, nextY]);
  if (dx === 0 && !recursed && curChar !== "@") {
      const dx2 = curChar === "[" ? 1 : -1;
      move(dir, [xi + dx2, yi], true);
  }
  matrix2[nextY][nextX] = matrix2[yi][xi];
  matrix2[yi][xi] = ".";
}

let curCoord: Coord = [startX, startY];
let curCoord2: Coord = [startX2, startY2];

for (const dirChar of Array.from(steps).filter(c => c !== "\n")) {
  const curDir = dirMap[dirChar];
  if (moveInDirection(curDir, curCoord)) {
    curCoord[0] += curDir[0];
    curCoord[1] += curDir[1];
  }
  if (checkDirection(curDir, curCoord2)) {
    move(curDir, curCoord2);
    curCoord2[0] += curDir[0];
    curCoord2[1] += curDir[1];
  } else {
  }
}

const res1 = matrix
  .flatMap((line, y) => line
    .map((c, x) => [c, x, y])
    .filter(([c, _, __]) => c === "O")
    .map(([_, x, y]) => x + 100 * y)
  ).reduce((acc, cv) => acc + cv);

const res2 = matrix2
  .flatMap((line, y) => line
    .map((c, x) => [c, x, y])
    .filter(([c, _, __]) => c === "[")
    .map(([_, x, y]) => x + 100 * y)
  ).reduce((acc, cv) => acc + cv);

console.log({res1});
console.log({res2});
console.log(matrix2.map(line => line.join("")).join("\n"))

