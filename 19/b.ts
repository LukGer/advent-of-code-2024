const file = Bun.file("input.txt");
const text = await file.text();
const lines = text.split("\n");

const towels = lines[0].split(", ");
const designs = lines.splice(2);

let combinations = 0;

for (const design of designs) {
  const found = countPossibilities(design, towels);

  combinations += found;
}

console.log("Possible combinations: ", combinations);

function countPossibilities(target: string, substrings: string[]): number {
  const n = target.length;
  const dp = new Array<number>(n + 1).fill(0);

  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (const sub of substrings) {
      if (i >= sub.length && target.slice(i - sub.length, i) === sub) {
        dp[i] += dp[i - sub.length];
      }
    }
  }

  return dp[n];
}
