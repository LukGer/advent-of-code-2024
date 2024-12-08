const file = Bun.file("input.txt");

const text = await file.text();
const lines = text.split("\n");

const rows = lines.length;
const cols = lines[0].length;

type Coordinate = {
  x: number;
  y: number;
};

const antennas = new Map<string, Coordinate[]>();

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const c = lines[y][x];
    if (c !== ".") {
      if (!antennas.has(c)) {
        antennas.set(c, []);
      }
      antennas.get(c)!.push({ x, y });
    }
  }
}

const antinodes: Coordinate[] = [];

for (const [_, coords] of antennas) {
  for (let i = 0; i < coords.length; i++) {
    const first = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const second = coords[j];

      const deltaX = first.x - second.x;
      const deltaY = first.y - second.y;

      let antinodeX = first.x;
      let antinodeY = first.y;

      while (
        antinodeX >= 0 &&
        antinodeX < cols &&
        antinodeY >= 0 &&
        antinodeY < rows
      ) {
        if (!antinodes.some((a) => a.x === antinodeX && a.y === antinodeY)) {
          antinodes.push({ x: antinodeX, y: antinodeY });
        }

        antinodeX += deltaX;
        antinodeY += deltaY;
      }

      antinodeX = second.x;
      antinodeY = second.y;

      while (
        antinodeX >= 0 &&
        antinodeX < cols &&
        antinodeY >= 0 &&
        antinodeY < rows
      ) {
        if (!antinodes.some((a) => a.x === antinodeX && a.y === antinodeY)) {
          antinodes.push({ x: antinodeX, y: antinodeY });
        }

        antinodeX -= deltaX;
        antinodeY -= deltaY;
      }
    }
  }
}

function debugPrint() {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ".")
  );

  for (const [frequency, coords] of antennas) {
    for (const { x, y } of coords) {
      grid[y][x] = frequency;
    }
  }

  for (const { x, y } of antinodes) {
    grid[y][x] = "X";
  }

  for (const row of grid) {
    console.log(row.join(""));
  }
}

debugPrint();

console.log(antinodes.length);
