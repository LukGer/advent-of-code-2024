const file = Bun.file("input.txt");

const text = await file.text();

const grid = text.split("\n").map((line) => line.split(""));
const rows = grid.length;
const cols = grid[0].length;

const visitedCells: boolean[][] = Array.from({ length: rows }, () =>
  Array(cols).fill(false)
);

type Node = {
  x: number;
  y: number;
};

type Region = {
  plant: string;
  nodes: Node[];
  area: number;
  sides: number;
};

const plantRegions: Region[] = [];

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (visitedCells[y][x]) continue;

    const plant = grid[y][x];

    const region = {
      plant,
      nodes: [],
      area: 0,
      sides: 0,
    };

    fillRegion(x, y, plant, region);

    region.sides = getSides(grid, region);

    plantRegions.push(region);
  }
}

const sum = plantRegions.reduce(
  (acc, region) => acc + region.area * region.sides,
  0
);

for (const region of plantRegions) {
  console.log(`${region.plant}: ${region.area} ${region.sides}`);
}

console.log("SUM: ", sum);

function fillRegion(x: number, y: number, plant: string, region: Region) {
  const stack: [number, number][] = [];

  stack.push([x, y]);

  while (stack.length > 0) {
    const [nodeX, nodeY] = stack.pop()!;

    if (nodeX < 0 || nodeX >= cols || nodeY < 0 || nodeY >= rows) continue;

    if (
      grid[nodeY][nodeX] == plant &&
      !region.nodes.some((node) => node.x == nodeX && node.y == nodeY)
    ) {
      region.nodes.push({ x: nodeX, y: nodeY });
      region.area++;

      visitedCells[nodeY][nodeX] = true;

      stack.push([nodeX, nodeY + 1]);
      stack.push([nodeX, nodeY - 1]);
      stack.push([nodeX + 1, nodeY]);
      stack.push([nodeX - 1, nodeY]);
    }
  }
}

function getSides(grid: string[][], region: Region): number {
  let sum = 0;
  for (const node of region.nodes) {
    const { x, y } = node;
    let corners = 0;

    if (grid[y - 1]?.[x] !== region.plant && grid[y][x - 1] !== region.plant) {
      console.log("top left corner found");

      corners++;
    }

    if (grid[y - 1]?.[x] !== region.plant && grid[y][x + 1] !== region.plant) {
      console.log("top right corner found");

      corners++;
    }

    if (grid[y + 1]?.[x] !== region.plant && grid[y][x - 1] !== region.plant) {
      console.log("bottom left corner found");
      corners++;
    }

    if (grid[y + 1]?.[x] !== region.plant && grid[y][x + 1] !== region.plant) {
      console.log("bottom right corner found");
      corners++;
    }

    if (
      grid[y][x + 1] === region.plant &&
      grid[y + 1]?.[x] === region.plant &&
      grid[y + 1]?.[x + 1] !== region.plant
    ) {
      console.log("top left inner corner found");

      corners++;
    }

    if (
      grid[y][x - 1] === region.plant &&
      grid[y + 1]?.[x] === region.plant &&
      grid[y + 1]?.[x - 1] !== region.plant
    ) {
      console.log("top right inner corner found");
      corners++;
    }

    if (
      grid[y][x + 1] === region.plant &&
      grid[y - 1]?.[x] === region.plant &&
      grid[y - 1]?.[x + 1] !== region.plant
    ) {
      console.log("bottom left inner corner found");
      corners++;
    }

    if (
      grid[y][x - 1] === region.plant &&
      grid[y - 1]?.[x] === region.plant &&
      grid[y - 1]?.[x - 1] !== region.plant
    ) {
      console.log("bottom right inner corner found");
      corners++;
    }

    console.log("Corners for ", x, y, corners);

    sum += corners;
  }

  return sum;
}
