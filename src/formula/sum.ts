import { rollValues } from "./rollValues";
import type { Result, ResultTerm, RollValue } from "./types";

/*@__PURE__*/
function sumMap<T>(iter: Iterable<T>, mapper: (value: T) => number): number {
  let sum = 0;
  for (const value of iter) {
    sum += mapper(value);
  }
  return sum;
}

/*@__PURE__*/
function sumValue(rollValue: RollValue): number {
  return rollValue.drop ? 0 : rollValue.value;
}

function sumTerm(term: ResultTerm): number {
  return term.type === "number"
    ? term.value
    : sumMap(rollValues(term), sumValue);
}

/*@__PURE__*/
export function sum(result: Result): number {
  return sumMap(result, sumTerm);
}
