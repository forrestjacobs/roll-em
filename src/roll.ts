import { dice, nativeMath } from "random-js";
import { Formula, FormulaTerm, Result, ResultTerm, RollPlan } from "./Formula";

function rollDice(term: RollPlan): number[] {
  return dice(term.sides, term.count)(nativeMath);
}

function rollTerm(term: FormulaTerm): ResultTerm {
  return term.type === "number" ? term : { value: rollDice(term), ...term };
}

export function roll(formula: Formula): Result {
  return formula.map(rollTerm);
}
