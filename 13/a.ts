import type { XY } from "../helper/types";

const file = Bun.file("input.txt");

const text = await file.text();
const lines = text.split("\n");

type Machine = {
  buttonA: XY;
  buttonB: XY;
  price: XY;
};

const machines: Machine[] = [];

for (let l = 0; l < lines.length; l += 4) {
  const buttonAMatch = lines[l].match(/X\+(\d+), Y\+(\d*)/) as RegExpMatchArray;
  const buttonBMatch = lines[l + 1].match(
    /X\+(\d+), Y\+(\d*)/
  ) as RegExpMatchArray;
  const priceMatch = lines[l + 2].match(/X=(\d+), Y=(\d*)/) as RegExpMatchArray;

  const machine: Machine = {
    buttonA: {
      x: parseInt(buttonAMatch[1]),
      y: parseInt(buttonAMatch[2]),
    },
    buttonB: {
      x: parseInt(buttonBMatch[1]),
      y: parseInt(buttonBMatch[2]),
    },
    price: {
      x: parseInt(priceMatch[1]),
      y: parseInt(priceMatch[2]),
    },
  };

  machines.push(machine);
}

let tokens = 0;

for (const machine of machines) {
  const solution = solve(machine);

  if (solution) {
    console.log("Solved for machine: ", solution.a, solution.b);

    tokens = tokens + solution.a * 3 + solution.b;
  }
}

function solve(machine: Machine): { a: number; b: number } | undefined {
  const a1 = machine.buttonA.x,
    b1 = machine.buttonB.x,
    targetX = machine.price.x;
  const a2 = machine.buttonA.y,
    b2 = machine.buttonB.y,
    targetY = machine.price.y;

  const det = a1 * b2 - a2 * b1;

  if (det === 0) {
    return undefined;
  }

  const determinantA = targetX * b2 - targetY * b1;
  const determinantB = a1 * targetY - a2 * targetX;

  const nA = determinantA / det;
  const nB = determinantB / det;

  if (Number.isInteger(nA) && Number.isInteger(nB) && nA >= 0 && nB >= 0) {
    return { a: nA, b: nB };
  } else {
    return undefined;
  }
}

console.log("TOKENS: ", tokens);
