import fs from "fs"

const input_file = "input.txt"
// const input_file = "test_input.txt"
const lines = fs.readFileSync(input_file, "utf-8");

function isListXmas(input) {
  const example = ["X", "M", "A", "S"];
  if (input.length !== example.length) {
    return false;
  }
  for (const [i, el] of input.entries()) {
    if (el !== example[i]) {
      return false;
    }
  }
  // console.log("XMAS!!!!!")
  return true;
}

function isListMs(input) {
  const example = ["M", "S"];
  if (input.length !== example.length) {
    return false;
  }
  input.sort();

  for (const [i, el] of input.entries()) {
    if (el !== example[i]) {
      return false;
    }
  }
  return true;
}

const matrix = [];
for (const line of lines.split("\n")) {
  if (line === "") {continue;}
  const arr = Array.from(line);
  matrix.push(arr);
}
const height = matrix.length;
const width = matrix[0].length;
let acc = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // console.log("x ", x, "y ", y)
    if (x + 3 < width) {
      const horizontalArr = [matrix[y][x], matrix[y][x+1], matrix[y][x+2], matrix[y][x+3]];
      acc += isListXmas(horizontalArr);
    }
    if (y + 3 < height) {
      const verticalArr = [matrix[y][x], matrix[y+1][x], matrix[y+2][x], matrix[y+3][x]];
      acc += isListXmas(verticalArr);
    }
    if (x - 3 >= 0) {
      const horizontalBackwardsArr = [matrix[y][x], matrix[y][x-1], matrix[y][x-2], matrix[y][x-3]];
      acc += isListXmas(horizontalBackwardsArr);
    }
    if (y - 3 >= 0) {
      const verticalBackwardsArr = [matrix[y][x], matrix[y-1][x], matrix[y-2][x], matrix[y-3][x]];
      acc += isListXmas(verticalBackwardsArr);
    }
    if (x + 3 < width && y + 3 < height) {
      const diagonalArr1 = [matrix[y][x], matrix[y+1][x+1], matrix[y+2][x+2], matrix[y+3][x+3]];
      acc += isListXmas(diagonalArr1);
    }
    if (x - 3 >= 0 && y - 3 >= 0) {
      const diagonalArr2 = [matrix[y][x], matrix[y-1][x-1], matrix[y-2][x-2], matrix[y-3][x-3]];
      acc += isListXmas(diagonalArr2);
    }
    if (x + 3 < width && y - 3 >= 0) {
      const diagonalArr3 = [matrix[y][x], matrix[y-1][x+1], matrix[y-2][x+2], matrix[y-3][x+3]];
      acc += isListXmas(diagonalArr3);
    }
    if (x - 3 >= 0 && y + 3 < height) {
      const diagonalArr4 = [matrix[y][x], matrix[y+1][x-1], matrix[y+2][x-2], matrix[y+3][x-3]];
      acc += isListXmas(diagonalArr4);
    }
  }
}

// console.log(lines);
console.log("res1 = ", acc);

let acc2 = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (matrix[y][x] !== "A") {
      continue;
    }
    if (x + 1 < width && y + 1 < height && x - 1 >= 0 && y - 1 >= 0) {
      const diagonalArr1 = [matrix[y+1][x+1], matrix[y-1][x-1]];
      const diagonalArr2 = [matrix[y-1][x+1], matrix[y+1][x-1]];
      if (isListMs(diagonalArr1) && isListMs(diagonalArr2)) {
        // console.log(matrix[y][x], x, y);
        acc2 += 1;
      }
    }
  }
}
console.log("res2 = ", acc2);
