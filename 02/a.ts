const input = Bun.file("input.txt");

const text = await input.text();

let sum = 0;

for (const line of text.split("\n")) {
  let isValid = true;

  const levels = line.split(" ");
  const correctSlope = Number(levels[0]) < Number(levels[1]) ? "inc" : "dec";

  for (let i = 0; i < levels.length - 1; i++) {
    if (
      (correctSlope === "inc" && Number(levels[i]) > Number(levels[i + 1])) ||
      (correctSlope === "dec" && Number(levels[i]) < Number(levels[i + 1]))
    ) {
      isValid = false;
      break;
    }

    const delta = Math.abs(Number(levels[i]) - Number(levels[i + 1]));

    if (delta > 3 || delta < 1) {
      console.log("WRONG DELTA: ", delta, levels[i], levels[i + 1]);
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    console.log("WRONG LINE: ", line);
  }

  if (isValid) sum++;
}

console.log("VALID: ", sum);
