import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
// const input = fs.readFileSync("test_input.txt", "utf8");

const matrix = input.
  split("\n").
  filter(line => line.length > 0).
  map(line => line.split(""));
const HEIGHT = matrix.length;
const WIDTH = matrix[0].length;

type Coord = [number, number];
const charCoordMap: Record<string, Array<Coord>> = {};
const antinodes1: Set<string> = new Set();
const antinodes2: Set<string> = new Set();

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const cur = matrix[y][x];
    if (cur !== ".") {
      charCoordMap[cur] = [...(charCoordMap[cur] || []), [x, y]]
    }
  }
}

for (const [_, coords] of Object.entries(charCoordMap)) {
  for (const curCoord of coords) {
    const [curX, curY] = curCoord;
    const otherCoords = coords.filter(coord => coord !== curCoord);
    for (const otherCoord of otherCoords) {
      const [otherX, otherY] = otherCoord;
      const [diffX, diffY] = [otherX - curX, otherY - curY];
      let [newX, newY] = [curX - diffX, curY - diffY]; 
      if (newX >= 0 && newX < WIDTH && newY >= 0 && newY < HEIGHT) {
        antinodes1.add([newX, newY].toString());
      }
      antinodes2.add(otherCoord.toString());
      while (newX >= 0 && newX < WIDTH && newY >= 0 && newY < HEIGHT) {
        antinodes2.add([newX, newY].toString());
        [newX, newY] = [newX - diffX, newY - diffY];
      }
    }
  }
}
console.log("res1 =", antinodes1.size);
console.log("res2 =", antinodes2.size);
