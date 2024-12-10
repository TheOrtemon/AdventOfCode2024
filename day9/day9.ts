import fs from "fs";

// const input = fs.readFileSync("test_input.txt", "utf8").trim()!;
const input = fs.readFileSync("input.txt", "utf8").trim()!;
// const input = "12345"
const inputArray1 = [...input].map(Number);
const inputArray2 = [...input].map(Number);

function getAccum(fileId: number, num: number, startId: number): number {
  // console.log({num, fileId, startId});
  const progrSum = (startId * 2 + num - 1) * num / 2
  return fileId * progrSum;
}

function getTypeById(id: number): string {
  return id % 2 === 0 ? "file" : "space";
} 

let res1 = 0;
let curId = 0;

for (let id = 0, tailId1 = inputArray1.length - 1; id < inputArray1.length; id++) {
  let num1 = inputArray1[id];
  const cellType = getTypeById(id);
  if (cellType === "file") {
    const fileId = Math.floor(id / 2);
    // console.log("i should print", num, "of", fileId);
    const curAcc = getAccum(fileId, num1, curId);
    res1 += curAcc;
  } else {
    if (id > tailId1) {
      break;
    }
    const tailNum = inputArray1[tailId1];
    const tailFileId = Math.floor(tailId1 / 2);
    let curAcc: number;
    if (num1 < tailNum) {
      const newTailNum = tailNum - num1;
      inputArray1[tailId1] = newTailNum;
      curAcc = getAccum(tailFileId, num1, curId);
    } else {
      const newHeadNum = num1 - tailNum;
      num1 = tailNum;
      inputArray1[id] = newHeadNum;
      inputArray1[tailId1] = 0;
      curAcc = getAccum(tailFileId, tailNum, curId);
      id--;
      tailId1 -= 2;
    }
    res1 += curAcc;
  }
  // console.log("adding",{curId, num})
  curId += num1;
  // console.log("res1 =", res1, "id", id, "tailId", tailId);
}
console.log("res1 =", res1);


let res2 = 0
let curId2 = 0;
const fileMoved = new Array((inputArray2.length + 1) / 2).fill(false);

for (let id = 0; id < inputArray2.length; id++) {
  let num2 = inputArray2[id];
  const cellType = getTypeById(id);
  if (cellType === "file") {
    const fileId = Math.floor(id / 2);
    // console.log("i should print", num, "of", fileId);
    if (!fileMoved[fileId]) {
      res2 += getAccum(fileId, num2, curId2);
    }
  } else {
    for (let tailId2 = inputArray2.length - 1; tailId2 >= id; tailId2 -= 2) {
      const tailNum = inputArray2[tailId2];
      const tailFileId = Math.floor(tailId2 / 2);
      if (num2 < tailNum || fileMoved[tailFileId]) {
        continue;
      }
      const newHeadSpaceNum = num2 - tailNum;
      inputArray2[id] = newHeadSpaceNum;
      fileMoved[tailFileId] = true;
      const curAcc = getAccum(tailFileId, tailNum, curId2);
      res2 += curAcc;
      id--;
      num2 = tailNum;
      break;
    }
  }
  // console.log("adding",{curId2, num})
  curId2 += num2;
  // console.log("res2 =", res2, "id", id, "tailId", tailId);
}
console.log("res2 =", res2);
