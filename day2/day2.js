import fs from "fs"

const lines = fs.readFileSync("input.txt", "utf8");

function isLineSafe(nums) {
  let safe_count = 0;
  let diff = undefined;
  for (let i = 0; i < nums.length - 1; i++) {
    const cur_diff = nums[i + 1] - nums[i];
    if (Math.abs(cur_diff) < 1 || Math.abs(cur_diff) > 3) {
      return 0;
    }
    if (diff === undefined) {
      diff = cur_diff;
      safe_count++;
    } else if ((diff > 0) === (cur_diff > 0)) {
      safe_count++;
    }
  }
  if (safe_count === nums.length - 1) {
    return 1;
  } else {
    return 0
  }
}

let acc = 0;
let acc2 = 0;

for (const line of lines.split("\n")) {
  if (line === "") {
    continue;
  }
  const nums = line.split(" ").map(Number);
  acc += isLineSafe(nums);
  let anySafe = false;
  for (let i = 0; i < nums.length; i++) {
    anySafe ||= isLineSafe(nums.filter((_, idx) => idx !== i));
  }
  acc2 += anySafe;
};

console.log("res 1: ", acc);
console.log("res 2: ", acc2);
