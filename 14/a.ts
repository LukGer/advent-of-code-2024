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

console.log(robots);

for (let i = 0; i < 100; i++) {
  for (const robot of robots) {
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
}

// Count robots in quadrants
const quadrant1 = robots.filter(
  (robot) => robot.x < Math.floor(cols / 2) && robot.y < Math.floor(rows / 2)
).length;
const quadrant2 = robots.filter(
  (robot) => robot.x >= Math.ceil(cols / 2) && robot.y < Math.floor(rows / 2)
).length;
const quadrant3 = robots.filter(
  (robot) => robot.x < Math.floor(cols / 2) && robot.y >= Math.ceil(rows / 2)
).length;
const quadrant4 = robots.filter(
  (robot) => robot.x >= Math.ceil(cols / 2) && robot.y >= Math.ceil(rows / 2)
).length;

const mult = quadrant1 * quadrant2 * quadrant3 * quadrant4;

console.log("RESULT: ", mult);
