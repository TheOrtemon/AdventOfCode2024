import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");

let res1 = 0;
let res2 = 0;
for (const line of input.split("\n").filter(line => line.length > 0)) {
  let [sumStr, strNums] = line.split(/:\s+/);
  const sum = Number(sumStr);
  const nums = strNums.split(/\s+/).map(Number);
  const q1 = [[...nums]];
  while (q1.length > 0) {
    const curNums = q1.shift()!;
    if (curNums.length === 1) {
      if (curNums[0] === sum) {
        res1 += sum;
        break;
      } else {
        continue;
      }
    }
    const curNum: number = curNums.shift()!;
    const nextNum: number = curNums.shift()!;
    q1.push([curNum * nextNum, ...curNums]);
    q1.push([curNum + nextNum, ...curNums]);
  }
  const q2 = [[...nums]];
  while (q2.length > 0) {
    const curNums: number[] = q2.shift()!;
    if (curNums.length === 1) {
      if (curNums[0] === sum) {
        res2 += sum;
        break;
      } else {
        continue;
      }
    }
    const curNum: number = curNums.shift()!;
    const nextNum: number = curNums.shift()!;
    q2.push([curNum * nextNum, ...curNums]);
    q2.push([curNum + nextNum, ...curNums]);
    q2.push([Number(curNum.toString() + nextNum.toString()), ...curNums]);
  }
  // console.log(sum, nums);
}
console.log("res1 =", res1);
console.log("res2 =", res2);
