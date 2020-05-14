import { Formula, FormulaTerm, Result, ResultTerm, RollPlan } from "./Formula";

function rollDice({ count, sides }: RollPlan): number[] {
  const value = [];
  for (let rollIndex = 0; rollIndex < count; rollIndex++) {
    value.push(Math.floor(Math.random() * sides) + 1);
  }
  return value;
}

function rollTerm(term: FormulaTerm): ResultTerm {
  return term.type === "number" ? term : { value: rollDice(term), ...term };
}

export function roll(formula: Formula): Result {
  return formula.map(rollTerm);
}
