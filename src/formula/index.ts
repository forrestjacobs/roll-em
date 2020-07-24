import { parse as pegParse } from "./parser.pegjs";
import type { Formula } from "./types";
import { validate } from "./validate";

export { roll } from "./roll";
export { sum } from "./sum";
export * from "./types";

export function parse(string: string): Formula {
  const value = pegParse(string);
  validate(value);
  return value;
}
