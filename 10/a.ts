const file = Bun.file("input.txt");

const text = await file.text();

const lines = text.split("\n");
const rows = lines.length;
const cols = lines[0].length;

const grid: number[][] = [];

for (let r = 0; r < rows; r++) {
  const row = lines[r].split("").map((x) => parseInt(x));
  grid.push(row);
}

const trailHeads: [number, number][] = [];

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === 0) {
      trailHeads.push([y, x]);
    }
  }
}

console.log(trailHeads);

let sum = 0;

for (const [y, x] of trailHeads) {
  const res = traversePath(0, x, y);

  const distinct = res.filter(
    (v, i, a) => a.findIndex((t) => t[0] === v[0] && t[1] === v[1]) === i
  );

  console.log(`Trailhead (${x}, ${y}) has ${distinct.length} paths`);

  sum += distinct.length;
}

console.log("SUM: ", sum);

function traversePath(
  elevation: number,
  x: number,
  y: number
): [number, number][] {
  if (elevation === 9) {
    return [[y, x]];
  }

  const nextTiles = getNextTiles(elevation, x, y);

  let sum: [number, number][] = [];

  for (const [ny, nx] of nextTiles) {
    sum.push(...traversePath(elevation + 1, nx, ny));
  }

  return sum;
}

function getNextTiles(elevation: number, x: number, y: number) {
  const nextTiles: [number, number][] = [];

  if (y > 0 && grid[y - 1][x] === elevation + 1) {
    nextTiles.push([y - 1, x]);
  }

  if (y < cols - 1 && grid[y + 1][x] === elevation + 1) {
    nextTiles.push([y + 1, x]);
  }

  if (x > 0 && grid[y][x - 1] === elevation + 1) {
    nextTiles.push([y, x - 1]);
  }

  if (x < rows - 1 && grid[y][x + 1] === elevation + 1) {
    nextTiles.push([y, x + 1]);
  }

  return nextTiles;
}
