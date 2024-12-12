const file = Bun.file("input.txt");

const text = await file.text();

let stones = text.split(" ").map(Number);

for (let i = 0; i < 25; i++) {
  const newStones = [];

  let inserted = 0;

  for (let y = 0; y < stones.length; y++) {
    const stone = stones[y];
    const stoneStr = stone.toString();

    if (stone === 0) {
      newStones[y + inserted] = 1;
    } else if (stoneStr.length % 2 === 0) {
      const left = stoneStr.slice(0, stoneStr.length / 2);
      const right = stoneStr.slice(stoneStr.length / 2);

      newStones[y + inserted] = Number(left);
      newStones[y + 1 + inserted] = Number(right);
      inserted++;
    } else {
      newStones[y + inserted] = stone * 2024;
    }
  }

  console.log("NEW STONES: ", newStones);

  stones = newStones;
}

console.log("LEN: ", stones.length);
