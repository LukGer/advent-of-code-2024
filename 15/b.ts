import type { XY } from "../helper/types";

const file = Bun.file("test_b.txt");

const text = await file.text();
const lines = text.split("\n");

const cols = 7;
const rows = 7;

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

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const cell = lines[y][x];

    if (cell === "#") {
      warehouse.walls.push({ x: x * 2, y });
      warehouse.walls.push({ x: x * 2 + 1, y });
    } else if (cell === "O") {
      warehouse.boxes.push({ x: x * 2, y });
    } else if (cell === "@") {
      warehouse.robot = { x: x * 2, y };
    }
  }
}

debugPrint(warehouse);

await new Promise((r) => setTimeout(r, 1000));

const instructions = lines[8];

for (const instruction of instructions) {
  move(warehouse, warehouse.robot, false, instruction as Direction);

  debugPrint(warehouse);

  await new Promise((r) => setTimeout(r, 1000));
}

const result = warehouse.boxes.reduce(
  (acc, box) => acc + box.x + box.y * 100,
  0
);

console.log("RESULT: ", result);

function move(
  warehouse: Warehouse,
  object: XY,
  isBox: boolean,
  direction: Direction
): boolean {
  const { x, y } = getNextPosition(object, direction);

  if (warehouse.walls.some((wall) => wall.x === x && wall.y === y)) {
    return false;
  }

  if (!isBox) {
    if (direction === "<") {
      const box = warehouse.boxes.find((b) => b.x === x - 1 && b.y === y);

      if (box && !move(warehouse, box, true, direction)) {
        return false;
      }
    } else if (direction === ">") {
      const box = warehouse.boxes.find((b) => b.x === x && b.y === y);

      if (box && !move(warehouse, box, true, direction)) {
        return false;
      }
    } else {
      const box = warehouse.boxes.find(
        (b) => (b.x === x || b.x === x - 1) && b.y === y
      );

      if (box && !move(warehouse, box, true, direction)) {
        return false;
      }
    }
  } else {
    if (direction === "<") {
      const otherBox = warehouse.boxes.find((b) => b.x === x - 1 && b.y === y);

      if (otherBox && !move(warehouse, otherBox, true, direction)) {
        return false;
      }
    } else if (direction === ">") {
      const otherBox = warehouse.boxes.find((b) => b.x === x + 1 && b.y === y);

      if (otherBox && !move(warehouse, otherBox, true, direction)) {
        return false;
      }
    } else {
      const leftSideBox = warehouse.boxes.find(
        (b) => b.x === x - 1 && b.y === y
      );

      if (leftSideBox) {
        if (!move(warehouse, leftSideBox, true, direction)) {
          return false;
        }
      }

      const middleBox = warehouse.boxes.find((b) => b.x === x && b.y === y);

      if (middleBox) {
        if (!move(warehouse, middleBox, true, direction)) {
          return false;
        }
      }

      const rightSideBox = warehouse.boxes.find(
        (b) => b.x === x + 1 && b.y === y
      );

      if (rightSideBox) {
        if (!move(warehouse, rightSideBox, true, direction)) {
          return false;
        }
      }
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
      return { x: current.x - 2, y: current.y };
    case ">":
      return { x: current.x + 2, y: current.y };
  }
}

function debugPrint(warehouse: Warehouse) {
  console.clear();

  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols * 2; x++) {
      if (warehouse.walls.some((wall) => wall.x === x && wall.y === y)) {
        line += "#";
      } else if (warehouse.boxes.some((box) => box.x === x && box.y === y)) {
        line += "[]";
        x++;
      } else if (warehouse.robot.x === x && warehouse.robot.y === y) {
        line += "@";
      } else {
        line += " ";
      }
    }
    console.log(line);
  }
}
