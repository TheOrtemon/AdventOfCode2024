import fs from 'fs';
const test_input = `3   4
4   3
2   5
1   3
3   9
3   3`;

// const lines = test_input;
const lines = fs.readFileSync("input.txt", "utf8");

const lList = [];
const rList = [];
const rCount = {};

for (const line of lines.split("\n")) {
  if (line === "") {
    continue;
  }
  const [a, b] = line.split(/\s+/).map(Number);
  lList.push(a);
  rList.push(b);
  rCount[b] = (rCount[b] || 0) + 1;
}
const resList2 = lList.map(it => it * (rCount[it] || 0));
// console.log(rCount[2]);
lList.sort((a, b) => a - b);
rList.sort((a, b) => a - b);

const resList = lList.map((it, id) => Math.abs(it - rList[id]))
const res = resList.reduce((acc, cv) => acc + cv);
// console.log(lList);
// console.log(resList2);
const res2 = resList2.reduce((acc, cv) => acc + cv);
console.log(res);
console.log(res2);
