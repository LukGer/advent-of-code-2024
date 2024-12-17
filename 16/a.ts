import type { XY } from "../helper/types";
import { MinHeap } from "./minheap";

const file = Bun.file("input.txt");

const text = await file.text();
const grid = text.split("\n");

const rows = grid.length;
const cols = grid[0].length;

type Node = XY;

const DIRECTIONS: [Node, Node, Node, Node] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

// construct a graph to make dijkstra search easier
let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

const forward: { [key: string]: { [key: string]: number } } = {};
const reverse: { [key: string]: { [key: string]: number } } = {};

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (grid[y][x] === "S") {
      start = { x, y };
    }

    if (grid[y][x] === "E") {
      end = { x, y };
    }

    if (grid[y][x] !== "#") {
      DIRECTIONS.forEach((direction, i) => {
        const position = { x: x + direction.x, y: y + direction.y };

        const key = `${x},${y},${i}`;
        const nextKey = `${position.x},${position.y},${i}`;

        if (
          position.x >= 0 &&
          position.x < cols &&
          position.y >= 0 &&
          position.y < rows &&
          grid[position.y][position.x] !== "#"
        ) {
          if (forward[key] === undefined) forward[key] = {};
          if (reverse[nextKey] === undefined) reverse[nextKey] = {};

          forward[key][nextKey] = 1;
          reverse[nextKey][key] = 1;
        }

        for (const rotateKey of [
          `${x},${y},${(i + 3) % 4}`,
          `${x},${y},${(i + 1) % 4}`,
        ]) {
          if (forward[key] === undefined) forward[key] = {};
          if (reverse[rotateKey] === undefined) reverse[rotateKey] = {};

          forward[key][rotateKey] = 1000;
          reverse[rotateKey][key] = 1000;
        }
      });
    }
  }
}

DIRECTIONS.forEach((_, i) => {
  const key = `${end.x},${end.y}`;
  const rotateKey = `${end.x},${end.y},${i}`;

  if (forward[rotateKey] === undefined) forward[rotateKey] = {};
  if (reverse[key] === undefined) reverse[key] = {};

  forward[rotateKey][key] = 0;
  reverse[key][rotateKey] = 0;
});

const dijkstra = (
  graph: { [key: string]: { [key: string]: number } },
  start: XY,
  directionless: boolean
): { [key: string]: number } => {
  const queue = new MinHeap<string>();
  const distances: { [key: string]: number } = {};

  let startingKey = `${start.x},${start.y},0`;
  if (directionless) startingKey = `${start.x},${start.y}`;

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

const distances = dijkstra(forward, start, false);
const result = distances[`${end.x},${end.y}`];

console.log(result);
