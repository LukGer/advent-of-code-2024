const file = Bun.file("input.txt");

const text = await file.text();

const matches = text.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm);

let sum = 0;

for (const match of matches) {
  const [_, a, b] = match;

  sum += parseInt(a) * parseInt(b);
}

console.log("SUM: ", sum);
