const file = Bun.file("input.txt");

const text = await file.text();

const iterations = 75;

let stones = text.split(" ").map(Number);

let stoneCount: { stone: number; count: number }[] = stones.map((stone) => ({
  stone,
  count: 1,
}));

for (let i = 0; i < iterations; i++) {
  let newStones: { stone: number; count: number }[] = [];

  for (let y = 0; y < stoneCount.length; y++) {
    const current = stoneCount[y];

    if (current.stone === 0) {
      addOrInsert({ stone: 1, count: current.count }, newStones);
      continue;
    }

    const stoneStr = current.stone.toString();
    if (stoneStr.length % 2 === 0) {
      const left = Number(stoneStr.slice(0, stoneStr.length / 2));
      const right = Number(stoneStr.slice(stoneStr.length / 2));

      addOrInsert({ stone: left, count: current.count }, newStones);
      addOrInsert({ stone: right, count: current.count }, newStones);
      continue;
    }

    addOrInsert(
      { stone: current.stone * 2024, count: current.count },
      newStones
    );
  }

  stoneCount = newStones;

  console.log("ITERATION: ", i);
}

function addOrInsert(
  s: { stone: number; count: number },
  stones: { stone: number; count: number }[]
) {
  const match = stones.find((x) => x.stone === s.stone);
  if (match) match.count += s.count;
  else stones.push(s);
}

const sum = stoneCount.reduce((acc, curr) => acc + curr.count, 0);

console.log("LEN: ", sum);
