import type { XY } from "../helper/types";

const file = Bun.file("input.txt");

const text = await file.text();
const lines = text.split("\n");

type Warehouse = {
  walls: XY[];
  boxes: XY[];
  robot: XY;
};

type Direction = "^" | "v" | "<" | ">";

const warehouse: Warehouse = {
  walls: [],
  boxes: [],
  robot: { x: 0, y: 0 },
};

for (let y = 0; y < 50; y++) {
  for (let x = 0; x < 50; x++) {
    const cell = lines[y][x];

    if (cell === "#") {
      warehouse.walls.push({ x, y });
    } else if (cell === "O") {
      warehouse.boxes.push({ x, y });
    } else if (cell === "@") {
      warehouse.robot = { x, y };
    }
  }
}

const instructions = lines[51];

for (const instruction of instructions) {
  move(warehouse, warehouse.robot, instruction as Direction);
}

const result = warehouse.boxes.reduce(
  (acc, box) => acc + box.x + box.y * 100,
  0
);

console.log("RESULT: ", result);

function move(warehouse: Warehouse, object: XY, direction: Direction): boolean {
  const { x, y } = getNextPosition(object, direction);

  if (warehouse.walls.some((wall) => wall.x === x && wall.y === y)) {
    return false;
  }

  const box = warehouse.boxes.find((box) => box.x === x && box.y === y);

  if (box) {
    if (!move(warehouse, box, direction)) {
      return false;
    }
  }

  object.x = x;
  object.y = y;

  return true;
}

function getNextPosition(current: XY, direction: Direction): XY {
  switch (direction) {
    case "^":
      return { x: current.x, y: current.y - 1 };
    case "v":
      return { x: current.x, y: current.y + 1 };
    case "<":
      return { x: current.x - 1, y: current.y };
    case ">":
      return { x: current.x + 1, y: current.y };
  }
}
