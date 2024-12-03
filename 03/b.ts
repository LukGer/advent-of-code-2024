const file = Bun.file("input.txt");

const text = await file.text();

const matches = text.matchAll(
  /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/gm
);

let sum = 0;
let addSums = true;

for (const match of matches) {
  const [_, a, b, c] = match;

  if (a === "do()") {
    addSums = true;
  } else if (a === "don't()") {
    addSums = false;
  } else if (a.startsWith("mul(") && addSums) {
    sum += parseInt(b) * parseInt(c);
  }
}

console.log("SUM: ", sum);
