import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").trim();

const matrix = input.split("\n").map(line => line.split("").map(Number));
const starts = matrix.flatMap((row, y) => 
  row.map((n, x) => [n, x])
     .filter(([n, _]) => n === 0)
     .map(([_, x]) => [x, y])
);

const HEIGHT = matrix.length;
const WIDTH = matrix[0].length;
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const resSet1 = new Set();
let res2 = 0;
starts.forEach(startingPoint => {
  const q = [[startingPoint, 0]];
  while (q.length > 0) {
    const [curPoint, curValue] = q.shift()!;
    if (curValue === 9) {
      res2 += 1;
      resSet1.add(`${startingPoint};${curPoint}`)
      continue;
    }

    DIRS.forEach(dir => {
      const nextPoint = [dir[0] + curPoint[0], dir[1] + curPoint[1]];
      const inBorders = nextPoint[0] >= 0 && nextPoint[0] < WIDTH && nextPoint[1] >= 0 && nextPoint[1] < HEIGHT;
      if (inBorders && matrix[nextPoint[1]][nextPoint[0]] - curValue === 1) {
        q.push([nextPoint, curValue + 1]);
      }
    })
  }
})

console.log("res1 =", resSet1.size);
console.log("res2 =", res2);
