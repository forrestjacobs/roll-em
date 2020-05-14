import { Result, ResultTerm } from "./Formula";

function sumMap<T>(array: T[], mapper: (value: T) => number): number {
  return array.reduce((acc, value) => acc + mapper(value), 0);
}

function id<T>(arg: T): T {
  return arg;
}

function sumTerm(term: ResultTerm): number {
  const sum = term.type === "number" ? term.value : sumMap(term.value, id);
  return term.sign * sum;
}

export function sum(result: Result): number {
  return sumMap(result, sumTerm);
}
