const file = Bun.file("input.txt");

const text = await file.text();

const lines = text.split("\n");

let overallSum = 0;

for (const line of lines) {
  const [t, rest] = line.split(": ");
  const target = Number(t);
  const numbers = rest.split(" ").map(Number);

  console.log("Trying to produce", target, "from", numbers);

  const [first, ...nums] = numbers;

  if (solve(nums, target, first, target + " = " + first)) {
    overallSum += target;
  }
}

function solve(
  numbers: number[],
  target: number,
  currentSum: number,
  debug: string
): boolean {
  if (numbers.length === 0) {
    return currentSum === target;
  }

  const [left, ...right] = numbers;
  let found = false;

  // Try addition
  found =
    solve(right, target, currentSum + left, debug + " + " + left) || found;

  // Try multiplication
  found =
    solve(right, target, currentSum * left, debug + " * " + left) || found;

  // Try concatenation
  const concatenated = Number(currentSum.toString() + left.toString());
  found = solve(right, target, concatenated, debug + " || " + left) || found;

  return found;
}

console.log("Result", overallSum);
