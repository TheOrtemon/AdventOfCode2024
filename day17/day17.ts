import { ALL } from "dns";
import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").trim();
// const input = fs.readFileSync("test_input.txt", "utf8").trim();
const [registersStr, programStr] = input.split("\n\n");
let [inputRegA, ..._] = registersStr
  .split("\n")
  .map(line => Number((line.match(/\d+/) || [-1])[0]));
const program = programStr.slice(9).split(",").map(Number);

function runTheProgram(regA: number): number[] {
  const programState = {
    curInstrId: 0,
    regA: BigInt(regA),
    regB: BigInt(0),
    regC: BigInt(0),
    res: new Array(),
    getCombo(o: number): bigint {
      switch (o) {
        case 0:
        case 1:
        case 2:
        case 3:
          return BigInt(o);
        case 4:
          return BigInt(this.regA);
        case 5:
          return BigInt(this.regB);
        case 6:
          return BigInt(this.regC);
        default:
          throw new Error("Unreachable");
      }
    },
  }
  while (programState.curInstrId < program.length) {
    const operator = program[programState.curInstrId];
    const operand = program[programState.curInstrId + 1];
    // console.log(operator, operand, programState.regA, programState.regB, programState.regC);
    switch (operator) {
      case 0:
        // console.log("adv");
        const adv = programState.regA / (BigInt(2) ** programState.getCombo(operand));
        programState.regA = adv;
        break;
      case 1:
        // console.log("bxl");
        const bxl = programState.regB ^ BigInt(operand);
        programState.regB = bxl;
        break;
      case 2:
        // console.log("bst");
        const bst = programState.getCombo(operand) % BigInt(8);
        programState.regB = bst;
        break;
      case 3:
        // console.log("jnz");
        if (programState.regA !== BigInt(0)) {
          programState.curInstrId = operand;
          continue;
        }
        break;
      case 4:
        // console.log("bxc");
        const bxc = programState.regB ^ programState.regC;
        programState.regB = bxc;
        break;
      case 5:
        // console.log("out");
        const out = programState.getCombo(operand) % BigInt(8);
        programState.res.push(out);
        break;
      case 6:
        // console.log("bdv");
        const bdv = programState.regA / (BigInt(2) ** programState.getCombo(operand));
        programState.regB = bdv;
        break;
      case 7:
        // console.log("cdv");
        const cdv = programState.regA / (BigInt(2) ** programState.getCombo(operand));
        programState.regC = cdv;
        break;
      default:
        throw Error("Unreachable");
    }
    programState.curInstrId += 2;
  }
  return programState.res;
}

let res1 = runTheProgram(inputRegA);
console.log("res1", res1.map(n => String(n)).join(","));

const programSize = program.length - 1;
const newProgramStr = program.join("");

function getLastPart(s: string, n: number): string {
  return s.slice(s.length - n, s.length);
}

function getBrokenProgram(order: number, prevNum: number): number | null {
  const fixedPartNum = programSize - order;
  for (let d = 0; d < 8; d++) {
    if (d === 0 && order === programSize) {
      continue;
    }
    const curNum = prevNum + (8 ** order) * d;
    const curNumStr = runTheProgram(curNum).join("");
    if (getLastPart(curNumStr, fixedPartNum + 1) === getLastPart(newProgramStr, fixedPartNum + 1)) {
      if (curNumStr === newProgramStr) {
        return curNum;
      }
      const opt = getBrokenProgram(order - 1, curNum);
      if (opt !== null) {
        return opt;
      }
    }
  }
  return null;
}
console.log("res2", getBrokenProgram(programSize, 0));

