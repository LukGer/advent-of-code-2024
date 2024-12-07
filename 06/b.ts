const file = Bun.file("input.txt");

const text = await file.text();

const cells = text.split("\n").map((line) => line.split("") as string[]);

const rows = cells.length;
const columns = cells[0].length;

const idx = text.indexOf("^");
const lines = text.substring(0, idx).split("\n");
const startingPosY = lines.length - 1;
const startingPosX = lines[startingPosY].length;

type Direction = "up" | "down" | "left" | "right";

interface Game {
  cells: string[][];
  visitedCells: {
    x: number;
    y: number;
    direction: Direction;
  }[];
  posX: number;
  posY: number;
  direction: Direction;
}

const initialGame: Game = {
  cells,
  visitedCells: [],
  posX: startingPosX,
  posY: startingPosY,
  direction: "up",
};

while (true) {
  const { x, y } = getNextPos(
    initialGame.posX,
    initialGame.posY,
    initialGame.direction
  );

  if (x < 0 || x >= columns || y < 0 || y >= rows) {
    break;
  }

  if (checkBlocked(initialGame, x, y)) {
    turnRight(initialGame);
  } else {
    initialGame.posX = x;
    initialGame.posY = y;
    initialGame.visitedCells.push({
      x,
      y,
      direction: initialGame.direction,
    });
  }
}

console.log("INITIAL GAME: ");
debugPrint(initialGame);

let blocksForLoop: { x: number; y: number }[] = [];

const visitedCells = initialGame.visitedCells;

for (let i = 0; i < visitedCells.length; i++) {
  console.log(`Checking ${i + 1}/${visitedCells.length}`);

  const cell = visitedCells[i];

  const game = JSON.parse(JSON.stringify(initialGame)) as Game;

  game.cells[cell.y][cell.x] = "O";
  game.visitedCells = [];
  game.direction = "up";
  game.posX = startingPosX;
  game.posY = startingPosY;

  const doesLoop = simulationDoesLoop(game);

  if (doesLoop) {
    // debugPrint(game);

    if (
      !blocksForLoop.some((block) => block.x === cell.x && block.y === cell.y)
    ) {
      blocksForLoop.push({ x: cell.x, y: cell.y });
    }
  }
}

console.log("Loops: ", blocksForLoop.length);

function simulationDoesLoop(game: Game): boolean {
  while (true) {
    const { x, y } = getNextPos(game.posX, game.posY, game.direction);

    if (x < 0 || x >= columns || y < 0 || y >= rows) {
      return false;
    }

    if (checkBlocked(game, x, y)) {
      turnRight(game);
    } else {
      if (
        game.visitedCells.some(
          (cell) =>
            cell.x === x && cell.y === y && cell.direction === game.direction
        )
      ) {
        return true;
      }

      game.posX = x;
      game.posY = y;

      game.visitedCells.push({
        x,
        y,
        direction: game.direction,
      });

      game.cells[y][x] = "X";
    }
  }
}

function checkBlocked(game: Game, x: number, y: number) {
  return game.cells[y][x] === "#" || game.cells[y][x] === "O";
}

function turnRight(g: Game) {
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

function getNextPos(
  posX: number,
  posY: number,
  direction: Direction
): { x: number; y: number } {
  if (direction === "up") {
    return { x: posX, y: posY - 1 };
  } else if (direction === "down") {
    return { x: posX, y: posY + 1 };
  } else if (direction === "left") {
    return { x: posX - 1, y: posY };
  } else {
    return { x: posX + 1, y: posY };
  }
}

function debugPrint(game: Game) {
  for (let y = 0; y < game.cells.length; y++) {
    let line = "";

    for (let x = 0; x < game.cells[y].length; x++) {
      if (game.visitedCells.some((cell) => cell.x === x && cell.y === y)) {
        line += "X";
      } else {
        line += game.cells[y][x];
      }
    }

    console.log(line);
  }

  console.log();
}
