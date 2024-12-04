const file = Bun.file("input.txt");

const text = await file.text();
const matrix = text.split("\n").map((line) => line.split(""));

let sum = 0;

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    const c = matrix[y][x];

    if (c === "X") {
      const numMatches = checkXmas(matrix, x, y);
      sum += numMatches;
    }
  }
}

function checkXmas(matrix: string[][], x: number, y: number): number {
  let numMatches = 0;

  if (
    x > 2 &&
    y > 2 &&
    matrix[y - 1][x - 1] === "M" &&
    matrix[y - 2][x - 2] === "A" &&
    matrix[y - 3][x - 3] === "S"
  ) {
    numMatches++;
  }

  if (
    y > 2 &&
    matrix[y - 1][x] === "M" &&
    matrix[y - 2][x] === "A" &&
    matrix[y - 3][x] === "S"
  ) {
    numMatches++;
  }

  if (
    x < matrix[y].length - 3 &&
    y > 2 &&
    matrix[y - 1][x + 1] === "M" &&
    matrix[y - 2][x + 2] === "A" &&
    matrix[y - 3][x + 3] === "S"
  ) {
    numMatches++;
  }

  if (
    x < matrix[y].length - 3 &&
    matrix[y][x + 1] === "M" &&
    matrix[y][x + 2] === "A" &&
    matrix[y][x + 3] === "S"
  ) {
    numMatches++;
  }

  if (
    x < matrix[y].length - 3 &&
    y < matrix.length - 3 &&
    matrix[y + 1][x + 1] === "M" &&
    matrix[y + 2][x + 2] === "A" &&
    matrix[y + 3][x + 3] === "S"
  ) {
    numMatches++;
  }

  if (
    y < matrix.length - 3 &&
    matrix[y + 1][x] === "M" &&
    matrix[y + 2][x] === "A" &&
    matrix[y + 3][x] === "S"
  ) {
    numMatches++;
  }

  if (
    x > 2 &&
    y < matrix.length - 3 &&
    matrix[y + 1][x - 1] === "M" &&
    matrix[y + 2][x - 2] === "A" &&
    matrix[y + 3][x - 3] === "S"
  ) {
    numMatches++;
  }

  if (
    x > 2 &&
    matrix[y][x - 1] === "M" &&
    matrix[y][x - 2] === "A" &&
    matrix[y][x - 3] === "S"
  ) {
    numMatches++;
  }

  return numMatches;
}

console.log("SUM: ", sum);
