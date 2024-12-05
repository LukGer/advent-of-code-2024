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

  if (!validatePages(pages)) {
    console.log("UNSORTED: ", pages);

    const sorted = sortPages(pages);

    console.log("SORTED: ", sorted);

    const middleNumber = sorted[Math.floor(sorted.length / 2)];

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

function sortPages(pages: number[]): number[] {
  const copy = [...pages];

  for (let i = 0; i < copy.length; i++) {
    const page = copy[i];
    const pagesThatShouldBeBefore = rules.filter((rule) => rule.after === page);

    for (const rule of pagesThatShouldBeBefore) {
      const index = copy.indexOf(rule.before);

      if (index > i) {
        const entry = copy.splice(index, 1);

        copy.splice(i, 0, entry[0]);

        i = -1;
      }
    }
  }

  return copy;
}

console.log("SUM: ", sum);
