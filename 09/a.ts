const file = Bun.file("input.txt");

const text = await file.text();

const memory: (number | undefined)[] = [];

let index = 0;
let id = 0;

for (let i = 0; i < text.length; i++) {
  const n = Number(text[i]);

  for (let y = 0; y < n; y++) {
    if (i % 2 !== 0) {
      memory[index] = undefined;
    } else {
      memory[index] = id;
    }

    index++;
  }

  if (i % 2 === 0) {
    id++;
  }
}

for (let i = memory.length - 1; i >= 0; i--) {
  const n = memory[i];

  if (n !== -1) {
    const idx = memory.indexOf(undefined);

    if (idx !== -1) {
      memory[idx] = n;
      memory[i] = undefined;
    }
  }
}

const flattenedMemory = memory.filter((n) => n !== undefined);

let checksum = 0;

for (let i = 0; i < flattenedMemory.length; i++) {
  checksum += flattenedMemory[i] * i;
}

console.log(checksum);
