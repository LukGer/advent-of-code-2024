const file = Bun.file("input.txt");

const text = await file.text();
const matrix = text.split("\n").map((line) => line.split(""));

let sum = 0;

for (let y = 0; y < matrix.length; y++) {
  let line = "";
  for (let x = 0; x < matrix[y].length; x++) {
    const c = matrix[y][x];

    if (c === "A") {
      if (checkXmas(matrix, y, x)) sum++;

      line += "A";
    } else {
      line += ".";
    }
  }

  console.log(line);
}

function checkXmas(matrix: string[][], y: number, x: number): boolean {
  if (y < 1 || x < 1 || y >= matrix.length - 1 || x >= matrix[y].length - 1) {
    return false;
  }

  if (
    ((matrix[y - 1][x - 1] === "M" && matrix[y + 1][x + 1] === "S") ||
      (matrix[y - 1][x - 1] === "S" && matrix[y + 1][x + 1] === "M")) &&
    ((matrix[y - 1][x + 1] === "M" && matrix[y + 1][x - 1] === "S") ||
      (matrix[y - 1][x + 1] === "S" && matrix[y + 1][x - 1] === "M"))
  ) {
    return true;
  }

  return false;
}

console.log("SUM: ", sum);
