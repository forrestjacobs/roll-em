import { dice, nativeMath } from "random-js";
import { Formula, FormulaTerm, Result, ResultTerm } from "./Formula";

function rollDice(sides: number, number: number): number[] {
  return dice(sides, number)(nativeMath);
}

function rollTerm(term: FormulaTerm): ResultTerm {
  return term.type === "number"
    ? term
    : { value: rollDice(term.sides, term.number), ...term };
}

export function roll(formula: Formula): Result {
  return formula.map(rollTerm);
}
