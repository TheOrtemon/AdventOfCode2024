import fs from "fs";

const customMod = (x: number, base: number) => ((x % base) + base) % base;
// const input = fs.readFileSync("test_input.txt", "utf8").trim();
const input = fs.readFileSync("input.txt", "utf8").trim();
const pattern = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;

const HEIGHT = 103;
const WIDTH = 101;

const getHalf = (n: number, len: number) => {
  if (n + 1 < len / 2) {return 0} 
  else if (n > len / 2) {return 1} 
  else {return null}
};

const getQuadrant = (x: number, w: number, y: number, h: number) => {
  const xQuad = getHalf(x, w);
  const yQuad = getHalf(y, h);
  if (xQuad === null || yQuad === null) {
    return null;
  }
  return (xQuad + yQuad * 2);
}


function getResult(isPart1: boolean) {
  for (let TIME = 0; TIME < 100000; TIME++) {
    let quadrants
    if (isPart1) {
      quadrants = [0, 0, 0, 0];
      TIME = 100;
    }
    const matrix = new Array(HEIGHT).fill().map(() => new Array(WIDTH).fill('.'));
    input.split("\n").forEach(line => {
      const res = line.match(pattern);
      const [_, x0, y0, vx0, vy0] = res.map(Number);
      const [xi, yi] = [customMod(x0 + vx0 * TIME, WIDTH), customMod(y0 + vy0 * TIME, HEIGHT)];
      // console.log(xi, yi);
      matrix[yi][xi] = "#";
      if (isPart1) {
        const quad = getQuadrant(xi, WIDTH, yi, HEIGHT);
        if (quad !== null) {
          quadrants[quad] += 1;
        }
      }
    })
    if (isPart1) {
      return quadrants.reduce((acc, cv) => acc * cv);
    }
    for (let y = 0; y < HEIGHT; y++) {
      let counter = 0;
      for (let x = 0; x < WIDTH; x++) {
        if (matrix[y][x] == '.') {
          counter = 0
        } else {
          counter++;
        }
        if (counter === 10) {
          return TIME;
        }
      }
    }
  }
}
console.log("res1", getResult(true))
console.log("res2", getResult(false))

