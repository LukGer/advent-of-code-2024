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
  perimeter: number;
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
      perimeter: 0,
    };

    fillRegion(x, y, plant, region);

    plantRegions.push(region);
  }
}

const sum = plantRegions.reduce(
  (acc, region) => acc + region.area * region.perimeter,
  0
);

for (const region of plantRegions) {
  console.log(`${region.plant}: ${region.area} ${region.perimeter}`);
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
      region.perimeter += getPerimeter(plant, nodeX, nodeY);

      visitedCells[nodeY][nodeX] = true;

      stack.push([nodeX, nodeY + 1]);
      stack.push([nodeX, nodeY - 1]);
      stack.push([nodeX + 1, nodeY]);
      stack.push([nodeX - 1, nodeY]);
    }
  }
}

function getPerimeter(plant: string, x: number, y: number) {
  let perimeter = 0;

  if (x == 0 || grid[y][x - 1] !== plant) perimeter++;
  if (x == cols - 1 || grid[y][x + 1] !== plant) perimeter++;
  if (y == 0 || grid[y - 1][x] !== plant) perimeter++;
  if (y == rows - 1 || grid[y + 1][x] !== plant) perimeter++;

  return perimeter;
}
