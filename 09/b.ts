const file = Bun.file("input.txt");

const text = await file.text();

const memory: { n?: number; l: number }[] = [];

let id = 0;

for (let i = 0; i < text.length; i++) {
  const n = Number(text[i]);

  if (i % 2 !== 0) {
    memory.push({ n: undefined, l: n });
  } else {
    memory.push({ n: id, l: n });
    id++;
  }
}

console.log(memory);

for (let i = memory.length - 1; i >= 0; i--) {
  const cell = memory[i];

  if (cell.n !== undefined) {
    const idx = memory.findIndex(
      (c, cellIdx) => c.n === undefined && c.l >= cell.l && cellIdx <= i
    );

    if (idx !== -1) {
      const freeCell = memory[idx];

      if (freeCell.l === cell.l) {
        freeCell.n = cell.n;
        cell.n = undefined;
      } else {
        memory[idx] = cell;
        memory[i] = { n: undefined, l: cell.l };

        const newEmptyCell = { n: undefined, l: freeCell.l - cell.l };
        memory.splice(idx + 1, 0, newEmptyCell);
      }
    }
  }
}

let flattenedMemory: number[] = [];

for (let i = 0; i < memory.length; i++) {
  const cell = memory[i];

  for (let j = 0; j < cell.l; j++) {
    flattenedMemory.push(cell.n ?? 0);
  }
}

let checksum = 0;

for (let i = 0; i < flattenedMemory.length; i++) {
  checksum += flattenedMemory[i] * i;
}

console.log(checksum);
