const file = Bun.file("input.txt");

const text = await file.text();
const lines = text.split("\n");

const rows = 103;
const cols = 101;

type Robot = {
  x: number;
  y: number;
  velX: number;
  velY: number;
};

const robots: Robot[] = [];

for (const line of lines) {
  const [_, x, y, velX, velY] =
    line.match(/(\d+),(\d+) .*?(-*\d+),(-*\d+)/) ?? [];

  const robot: Robot = {
    x: parseInt(x),
    y: parseInt(y),
    velX: parseInt(velX),
    velY: parseInt(velY),
  };

  robots.push(robot);
}

let s = 0;

while (true) {
  for (const robot of robots) {
    moveRobot(robot);
  }

  s++;

  if (checkForRectangle(robots)) {
    printRobots(robots);
    break;
  }
}

function moveRobot(robot: Robot) {
  let newX = robot.x + robot.velX;

  if (newX < 0) {
    newX = cols + newX;
  } else if (newX >= cols) {
    newX = newX - cols;
  }

  let newY = robot.y + robot.velY;

  if (newY < 0) {
    newY = rows + newY;
  } else if (newY >= rows) {
    newY = newY - rows;
  }

  robot.x = newX;
  robot.y = newY;
}

function printRobots(robots: Robot[]) {
  console.clear();

  const grid = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(" "));

  for (const robot of robots) {
    grid[robot.y][robot.x] = "#";
  }

  console.log(grid.map((row) => row.join("")).join("\n"));
  console.log("\nStep:", s);
}

function checkForRectangle(robots: Robot[]): boolean {
  // check if no robots share the same position: Total hack...

  const positions = new Set<string>();

  for (const robot of robots) {
    const key = `${robot.x},${robot.y}`;

    if (positions.has(key)) {
      return false;
    }

    positions.add(key);
  }

  return true;
}

console.log("RESULT: ", s);
