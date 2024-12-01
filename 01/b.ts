const input = Bun.file("input_01.txt");

const text = await input.text();

let left = [];
const right = new Map<number, number>();

for (const line of text.split("\n")) {
  const [l, r] = line.split("   ");

  if (!l || !r) continue;

  left.push(Number(l));

  const current = right.get(Number(r)) ?? 0;

  right.set(Number(r), current + 1);
}

let score = 0;

for (const n of left) {
  const current = right.get(n) ?? 0;

  score += current * n;
}

console.log("SCORE: ", score);
