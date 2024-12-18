import { MinHeap } from "../helper/minheap";
import type { XY } from "../helper/types";

const file = Bun.file("input.txt");
const text = await file.text();
const lines = text.split("\n");

const rows = 71;
const cols = 71;
const count = 1024;
const start: XY = { x: 0, y: 0 };
const end: XY = { x: cols - 1, y: rows - 1 };
const grid: string[][] = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => ".")
);

for (let i = 0; i < count; i++) {
  const [x, y] = lines[i].split(",").map(Number);

  grid[y][x] = "#";
}

debugPrint(grid, rows, cols);

type Node = XY;

const DIRECTIONS: [Node, Node, Node, Node] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const forward: { [key: string]: { [key: string]: number } } = {};

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] !== "#") {
      DIRECTIONS.forEach((direction) => {
        const position = { x: x + direction.x, y: y + direction.y };

        const key = `${x},${y}`;
        const nextKey = `${position.x},${position.y}`;

        if (
          position.x >= 0 &&
          position.x < cols &&
          position.y >= 0 &&
          position.y < rows &&
          grid[position.y][position.x] !== "#"
        ) {
          if (forward[key] === undefined) forward[key] = {};

          forward[key][nextKey] = 1;
        }
      });
    }
  }
}

DIRECTIONS.forEach((_) => {
  const key = `${end.x},${end.y}`;
  const rotateKey = `${end.x},${end.y}`;

  if (forward[rotateKey] === undefined) forward[rotateKey] = {};

  forward[rotateKey][key] = 0;
});

const dijkstra = (
  graph: { [key: string]: { [key: string]: number } },
  start: XY
): { [key: string]: number } => {
  const queue = new MinHeap<string>();
  const distances: { [key: string]: number } = {};

  let startingKey = `${start.x},${start.y}`;

  queue.insert({ score: 0, node: startingKey });
  distances[startingKey] = 0;

  while (queue.size() !== 0) {
    const current = queue.extractMin();

    if (distances[current.node] < current.score) continue;

    if (graph[current.node] === undefined) continue;

    Object.entries(graph[current.node]).forEach(([next, weight]) => {
      const newScore = current.score + weight;
      if (distances[next] === undefined || distances[next] > newScore) {
        distances[next] = newScore;
        queue.insert({ score: newScore, node: next });
      }
    });
  }

  return distances;
};

const distances = dijkstra(forward, start);
const result = distances[`${end.x},${end.y}`];

console.log(result);

function debugPrint(grid: string[][], rows: number, cols: number) {
  for (let y = 0; y < rows; y++) {
    let line = "";

    for (let x = 0; x < cols; x++) {
      line += grid[y][x] ?? ".";
    }

    console.log(line);
  }
}
