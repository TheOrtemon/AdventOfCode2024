import fs from "fs";
/*
a * 94 + b * 22 = 8400
a * 34 + b * 67 = 5400

b = (8400 - a * 94) / 22
a * 34 + 67 / 22 * (8400 - a * 94) = 5400
a * 34 * 22 + 67 * 8400 - a * 94 * 67 = 5400 * 22
a * (34 * 22 - 94 * 67) = 5400 * 22 - 67 * 8400
a = (5400 * 22 - 67 * 8400) / (34 * 22 - 94 * 67)
a = (yr * xb - xr * yb) / (xb * ya - xa * yb)
b = (xr - a * xa) / xb
a * 5550 = 444 000
a = 80
b = 40
T = a * 3 + b
T = 280
*/

// const [xa, ya] = [0, 0];
// const [xb, yb] = [0, 0];
// const [xr, yr] = [0, 0];

// const input = fs.readFileSync("test_input.txt", "utf8").trim();
const input = fs.readFileSync("input.txt", "utf8").trim();

const res2Diff = 10000000000000;
const arcades2 = [];
const arcades = input.split("\n\n").map(arcade => {
  const [A, B, Prize] = arcade.split("\n")
  const pattern = /\D+(\d+)\D+(\d+)/;
  const [xa, ya] = A.match(pattern).slice(1,3).map(Number);
  const [xb, yb] = B.match(pattern).slice(1,3)!.map(Number);
  const [xr, yr] = Prize.match(pattern).slice(1,3).map(Number);
  const [xr2, yr2] = [xr + res2Diff, yr + res2Diff];
  const a = (yr * xb - xr * yb) / (xb * ya - xa * yb);
  const b = (xr - a * xa) / xb;
  const a2 = (yr2 * xb - xr2 * yb) / (xb * ya - xa * yb);
  const b2 = (xr2 - a2 * xa) / xb;
  let token2: number;
  if (!isNaN(a2) && !isNaN(b2) && Number.isInteger(a2) && Number.isInteger(b2)) {
    token2 = a2 * 3 + b2;
  } else {
    token2 = 0;
  }
  arcades2.push(token2);
  if (!isNaN(a) && !isNaN(b) && Number.isInteger(a) && Number.isInteger(b)) {
    return a * 3 + b;
  } else {
    return 0;
  }
})

const res1 = arcades.reduce((acc, cv) => acc + cv);
const res2 = arcades2.reduce((acc, cv) => acc + cv);

console.log(res1);
console.log(res2);
