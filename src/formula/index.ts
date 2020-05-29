import parser from "./parser.pegjs";
import { Formula } from "./types";

export { roll } from "./roll";
export { sum } from "./sum";
export * from "./types";

export const parse = parser.parse as (string: string) => Formula;
