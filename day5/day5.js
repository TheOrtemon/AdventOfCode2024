import fs from "fs";
// const fileName = "test_input.txt";
const fileName = "input.txt";

const input = fs.readFileSync(fileName, "utf-8");
const [pairsStr, lines] = input.split("\n\n");
const orderMap = {};
for (const line of pairsStr.split("\n").filter(line => line.length > 0)) {
  const [before, after] = line.split("|").map(Number);
  // console.log(before, after);
  orderMap[before] ??= {before: [], after: []};
  orderMap[after] ??= {before: [], after: []};
  orderMap[before].after.push(after);
  orderMap[after].before.push(before);
}
const numsLines = lines.
  split("\n").
  filter(line => line.length > 0).
  map(line => line.split(",").map(Number));

function isRightOrder(nums) {
  // console.log("nums: ", nums);
  for (const [i, num] of nums.entries()) {
    orderMap[num] ??= {before: [], after: []};
    const before = orderMap[num].before;
    const after = orderMap[num].after;
    const realBefore = new Set(nums.slice(0, i));
    const realAfter = new Set(nums.slice(i + 1));
    // // console.log(before, "should not contain ", realAfter);
    // console.log(after, "should not contain ", realBefore);
    const beforeInter = before.filter(x => realAfter.has(x));
    const afterInter = after.filter(x => realBefore.has(x));
    // console.log(num, "doesnt contradict the order: ", beforeInter.length !== 0 || afterInter.length !== 0);
    if (beforeInter.length !== 0 || afterInter.length !== 0) {
      return false;
    }
  }
  return true;
}

let res1 = 0;
let res2 = 0;
for (const nums of numsLines) {
  if (isRightOrder(nums)) {
    res1 += nums[Math.floor(nums.length / 2)];
  } else {
    nums.sort((a, b) => orderMap[a].before.includes(b) ? -1 : 1);
    res2 += nums[Math.floor(nums.length / 2)];
  }
  // console.log(nums, "is right order = ", isRightOrder(nums));
}
console.log("res1 = ", res1);
console.log("res2 = ", res2);



