import type { Formula, Result, RollPlan } from "./types";
import { randomInt } from "../utils/rng";

type Roller = (sides: number) => number;

function randomSide(sides: number): number {
  return randomInt(sides) + 1;
}

function rollDice({ count, sides }: RollPlan, roller: Roller): number[] {
  const value = [];
  for (let rollIndex = 0; rollIndex < count; rollIndex++) {
    value.push(roller(sides));
  }
  return value;
}

export function roll(formula: Formula, roller: Roller = randomSide): Result {
  return formula.map((term) =>
    term.type === "number" ? term : { value: rollDice(term, roller), ...term }
  );
}
