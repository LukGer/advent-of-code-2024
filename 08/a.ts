import type { XY } from "../helper/types";

const file = Bun.file("input.txt");

const text = await file.text();
const lines = text.split("\n");

const rows = lines.length;
const cols = lines[0].length;

const antennas = new Map<string, XY[]>();

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

const antinodes: XY[] = [];

for (const [_, coords] of antennas) {
  for (let i = 0; i < coords.length; i++) {
    const first = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const second = coords[j];

      const deltaX = first.x - second.x;
      const deltaY = first.y - second.y;

      const firstAntinodeX = first.x + deltaX;
      const firstAntinodeY = first.y + deltaY;

      const secondAntinodeX = second.x - deltaX;
      const secondAntinodeY = second.y - deltaY;

      if (
        firstAntinodeX >= 0 &&
        firstAntinodeX < cols &&
        firstAntinodeY >= 0 &&
        firstAntinodeY < rows &&
        !antinodes.some((a) => a.x === firstAntinodeX && a.y === firstAntinodeY)
      ) {
        antinodes.push({ x: firstAntinodeX, y: firstAntinodeY });
      }

      if (
        secondAntinodeX >= 0 &&
        secondAntinodeX < cols &&
        secondAntinodeY >= 0 &&
        secondAntinodeY < rows &&
        !antinodes.some(
          (a) => a.x === secondAntinodeX && a.y === secondAntinodeY
        )
      ) {
        antinodes.push({ x: secondAntinodeX, y: secondAntinodeY });
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
