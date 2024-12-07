const file = Bun.file("input.txt");

const text = await file.text();

const cells = text.split("\n").map((line) => line.split("") as string[]);

const rows = cells.length;
const columns = cells[0].length;

const idx = text.indexOf("^");
const lines = text.substring(0, idx).split("\n");
const posY = lines.length - 1;
const posX = lines[posY].length;

const game: {
  cells: string[][];
  posX: number;
  posY: number;
  direction: "up" | "down" | "left" | "right";
} = {
  cells,
  posX,
  posY,
  direction: "up",
};

game.cells[game.posY][game.posX] = "X";

while (true) {
  const { x, y } = getNextPos(game);

  if (x < 0 || x >= columns || y < 0 || y >= rows) {
    break;
  }

  if (checkBlocked(x, y)) {
    turnRight(game);
  } else {
    game.posX = x;
    game.posY = y;
    game.cells[y][x] = "X";
  }
}

console.log("Steps: ", game.cells.flat().filter((c) => c === "X").length);

function checkBlocked(x: number, y: number) {
  return game.cells[y][x] === "#";
}

function turnRight(g: typeof game) {
  if (g.direction === "up") {
    g.direction = "right";
  } else if (g.direction === "down") {
    g.direction = "left";
  } else if (g.direction === "left") {
    g.direction = "up";
  } else {
    g.direction = "down";
  }
}

function getNextPos(g: typeof game): { x: number; y: number } {
  if (g.direction === "up") {
    return { x: g.posX, y: g.posY - 1 };
  } else if (g.direction === "down") {
    return { x: g.posX, y: g.posY + 1 };
  } else if (g.direction === "left") {
    return { x: g.posX - 1, y: g.posY };
  } else {
    return { x: g.posX + 1, y: g.posY };
  }
}
