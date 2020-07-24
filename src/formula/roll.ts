import type {
  Formula,
  FormulaTerm,
  Result,
  ResultTerm,
  RollPlan,
} from "./types";
import { randomInt } from "../utils/rng";

function rollDice({ count, sides }: RollPlan): number[] {
  const value = [];
  for (let rollIndex = 0; rollIndex < count; rollIndex++) {
    value.push(randomInt(sides) + 1);
  }
  return value;
}

function rollTerm(term: FormulaTerm): ResultTerm {
  return term.type === "number" ? term : { value: rollDice(term), ...term };
}

export function roll(formula: Formula): Result {
  return formula.map(rollTerm);
}
