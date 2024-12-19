const file = Bun.file("input.txt");
const text = await file.text();
const lines = text.split("\n");

const towels = lines[0].split(", ");
const designs = lines.splice(2);

let possible = 0;

for (const design of designs) {
  const found = checkDesign(design, towels);

  if (found) {
    console.log("Found design: ", design);
    possible++;
  }
}

console.log("Possible designs: ", possible);

function checkDesign(target: string, substrings: string[]): boolean {
  const n = target.length;
  const dp = new Array(n + 1).fill(false);

  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (const sub of substrings) {
      if (
        i >= sub.length &&
        target.slice(i - sub.length, i) === sub &&
        dp[i - sub.length]
      ) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}
