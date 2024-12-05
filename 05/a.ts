const file = Bun.file("./input.txt");

const text = await file.text();

const lines = text.split("\n");

const rules: { before: number; after: number }[] = [];

for (let i = 0; i < 1176; i++) {
  const line = lines[i];

  const [before, after] = line.split("|");

  rules.push({ before: parseInt(before), after: parseInt(after) });
}

let sum = 0;

for (let i = 1177; i < 1377; i++) {
  const line = lines[i];

  const pages = line.split(",").map((page) => parseInt(page));

  if (validatePages(pages)) {
    console.log("VALID: ", pages);

    const middleNumber = pages[Math.floor(pages.length / 2)];

    console.log("MIDDLE NUMBER: ", middleNumber);

    sum += middleNumber;
  }
}

function validatePages(pages: number[]): boolean {
  for (let i = 0; i < pages.length - 1; i++) {
    const page = pages[i];

    const pagesAllowedBefore = rules.filter((rule) => rule.after === page);

    const pagesAfter = pages.slice(i + 1);

    if (pagesAllowedBefore.some((rule) => pagesAfter.includes(rule.before))) {
      return false;
    }

    const pagesAllowedAfter = rules.filter((rule) => rule.before === page);

    const pagesBefore = pages.slice(0, i);

    if (pagesAllowedAfter.some((rule) => pagesBefore.includes(rule.after))) {
      return false;
    }
  }

  return true;
}

console.log("SUM: ", sum);
