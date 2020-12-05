import type { Result, ResultTerm } from "./types";

/*@__PURE__*/
function sumMap<T>(array: T[], mapper: (value: T) => number): number {
  return array.reduce((acc, value) => acc + mapper(value), 0);
}

/*@__PURE__*/
function id<T>(arg: T): T {
  return arg;
}

/*@__PURE__*/
function sumTerm(term: ResultTerm): number {
  return term.type === "number" ? term.value : sumMap(term.value, id);
}

/*@__PURE__*/
export function sum(result: Result): number {
  return sumMap(result, sumTerm);
}
