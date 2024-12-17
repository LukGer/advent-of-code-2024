const file = Bun.file("input.txt");
const text = await file.text();
const lines = text.split("\n");

const [, a] = lines[0].match(/: (\d*)/) || [];
const [, input] = lines[4].match(/([,\d]+)/) || [];

type Computer = {
  a: number;
  b: number;
  c: number;
  ip: number;
  in: number[];
  out: number[];
};

const computer = {
  a: parseInt(a),
  b: 0,
  c: 0,
  ip: 0,
  in: input.split(",").map(Number),
  out: [] as number[],
};

while (computer.ip >= 0 && computer.ip < computer.in.length) {
  const op = computer.in[computer.ip];
  const literalOperand = computer.in[computer.ip + 1];
  const comboOperand = getComboOperator(computer, literalOperand);

  switch (op) {
    case 0: {
      const num = computer.a;
      const den = 2 ** comboOperand;

      computer.a = Math.trunc(num / den);
      break;
    }
    case 1: {
      computer.b = computer.b ^ literalOperand;
      break;
    }
    case 2: {
      computer.b = comboOperand % 8;
      break;
    }
    case 3: {
      if (computer.a !== 0) {
        computer.ip = literalOperand;
        continue;
      }

      break;
    }
    case 4: {
      computer.b = computer.b ^ computer.c;
      break;
    }
    case 5: {
      computer.out.push(comboOperand % 8);
      break;
    }
    case 6: {
      computer.b = Math.trunc(computer.a / 2 ** comboOperand);
      break;
    }
    case 7: {
      computer.c = Math.trunc(computer.a / 2 ** comboOperand);
      break;
    }
    default: {
      throw new Error("Invalid operator");
    }
  }

  computer.ip += 2;
}

console.log(computer.out.join(","));

function getComboOperator(computer: Computer, operator: number) {
  switch (operator) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operator;
    case 4:
      return computer.a;
    case 5:
      return computer.b;
    case 6:
      return computer.c;
    default:
      return -1;
  }
}
