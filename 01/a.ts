const input = Bun.file("input_01.txt");

const text = await input.text();

let left = [];
let right = [];

for (const line of text.split("\n")) {
  const [l, r] = line.split("   ");

  if (!l || !r) continue;

  left.push(Number(l));
  right.push(Number(r));
}

left = left.sort();
right = right.sort();

let sum = 0;

for (let i = 0; i < left.length; i++) {
  const diff = Math.abs(left[i] - right[i]);

  sum += diff;
}

console.log("SUM: ", sum);
