import fs from "fs";

const lines = fs.readFileSync("input.txt", "utf-8");
// const lines = fs.readFileSync("input_test.txt", "utf-8");

const mulPattern = /mul\((\d+),(\d+)\)/g;

const accs1 = [];
const accs2 = [];
let dos = [...lines.matchAll(/do\(\)/g)];
let donts = [...lines.matchAll(/don't\(\)/g)];
let muls = [...lines.matchAll(mulPattern)];
const ranges = [...dos.map(el => ({index: el.index, type: "do"})), {index: 0, type: "do"}, 
  ...donts.map(el => ({index: el.index, type : "dont"})), {index: lines.length - 1, type: "dont"}];
ranges.sort((a, b) => a.index - b.index);
// console.log("ranges: ", ranges);
let type;
for (const found of muls) {
  const [_, a, b, __] = found;
  for (let [i, range] of ranges.entries()) {
    if (range.index > found.index) {
      type = ranges[i - 1].type;
      // console.log("do or dont id: ", range.index, "mul id: ", found.index, type);
      break;
    }
  }
  accs1.push(Number(a) * Number(b));
  if (type === "do") {
    accs2.push(Number(a) * Number(b));
  }
}

const res1 = accs1.reduce((acc, cv) => acc + cv);
const res2 = accs2.reduce((acc, cv) => acc + cv);

console.log(res1);
console.log(res2);
