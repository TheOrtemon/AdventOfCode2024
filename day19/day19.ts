import fs from "fs";

// const input = fs.readFileSync("test_input.txt", "utf8").trim();
const input = fs.readFileSync("input.txt", "utf8").trim();

const [rawPatterns, rawTowels] = input.split("\n\n");

const patterns = rawPatterns.split(", ");
const towels = rawTowels.split("\n");

const dp: Map<string, number> = new Map;

function consistsOfPatterns(towel: string, patterns: string[]): number {
  if (towel.length === 0) {
    return 1;
  }
  if (dp.has(towel)) {
    return dp.get(towel)!;
  }
  let res = 0;
  for (const pattern of patterns) { 
    const newStr = towel.slice(pattern.length);
    if (towel.startsWith(pattern)) {
      const nestedRes = consistsOfPatterns(newStr, patterns);
      dp.set(newStr, nestedRes);
      res += nestedRes;
    }
  }
  dp.set(towel, res);
  return res;
}


const resNumList = towels.map(towel => consistsOfPatterns(towel, patterns));
const res1 = resNumList.filter(n => n > 0).length;
console.log(res1);
const res2 = resNumList.reduce((acc, cv) => acc + cv);
console.log(res2);
