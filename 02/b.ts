const input = Bun.file("input.txt");

const text = await input.text();

let sum = 0;

for (const line of text.split("\n")) {
  const levels = line.split(" ").map(Number);
  let isValid = checkLevels(levels);

  if (!isValid) {
    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.filter((_, index) => index !== i);

      const newIsValid = checkLevels(newLevels);

      if (newIsValid) {
        isValid = true;
        break;
      }
    }
  }

  if (isValid) sum++;
}

function checkLevels(levels: number[]): boolean {
  const correctSlope = Number(levels[0]) < Number(levels[1]) ? "inc" : "dec";

  for (let i = 0; i < levels.length - 1; i++) {
    if (
      (correctSlope === "inc" && Number(levels[i]) > Number(levels[i + 1])) ||
      (correctSlope === "dec" && Number(levels[i]) < Number(levels[i + 1]))
    ) {
      return false;
    }

    const delta = Math.abs(Number(levels[i]) - Number(levels[i + 1]));

    if (delta > 3 || delta < 1) {
      return false;
    }
  }

  return true;
}

console.log("VALID: ", sum);
