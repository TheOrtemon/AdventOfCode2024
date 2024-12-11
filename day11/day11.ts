import fs from "fs";

// const input = fs.readFileSync("test_input.txt", "utf-8").trim();
const input = fs.readFileSync("input.txt", "utf-8").trim();

function blink(n: number): Array<number> {
  if (n === 0) {
    return [1];
  } 
  const digitNum = Math.floor(Math.log10(n)) + 1;
  if (digitNum % 2 === 0) {
    const tail = n % 10 ** (digitNum / 2);
    const head = Math.floor(n /  (10 ** (digitNum / 2)));
    return [head, tail];
  }
  else {
    return [n * 2024];
  }
}

const results = {};

function blinkCycleLen(nums: number[], blinksLeft: number): number {
  if (blinksLeft === 0) {
    return nums.length;
  }
  const savedResult = results[JSON.stringify([nums, blinksLeft])];
  if (savedResult !== undefined) {
    return savedResult;
  }
  
  const returnLen = [...nums]
    .map(n => blinkCycleLen(blink(n), blinksLeft - 1))
    .reduce((acc, cv) => acc + cv);

  results[JSON.stringify([nums, blinksLeft])] = returnLen;
  return returnLen;
}

const initList = input.split(" ").map(Number);
const BLINKS_NUMBER = 25;
const BLINKS_NUMBER2 = 75;


console.log("res1", blinkCycleLen(initList, BLINKS_NUMBER));
console.log("res2", blinkCycleLen(initList, BLINKS_NUMBER2));


