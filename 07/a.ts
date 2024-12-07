const file = Bun.file("input.txt");

const text = await file.text();

const lines = text.split("\n");

let overallSum = 0;

for (const line of lines) {
  const [t, rest] = line.split(": ");
  const target = Number(t);
  const numbers = rest.split(" ").map(Number);

  console.log("Trying to produce", target, "from", numbers);

  if (solve(numbers, target, 0)) {
    console.log("Can produce", target);
    overallSum += target;
  } else {
    console.log("Cannot produce", target);
  }
}

function solve(numbers: number[], target: number, currentSum: number): boolean {
  if (currentSum === target) {
    console.log("Success");
    return true;
  }

  if (currentSum > target) {
    return false;
  }

  if (numbers.length === 0) {
    return false;
  }

  const [left, ...right] = numbers;

  if (solve(right, target, currentSum + left)) {
    return true;
  }

  if (solve(right, target, (currentSum || 1) * left)) {
    return true;
  }

  return false;
}

console.log("Result", overallSum);
