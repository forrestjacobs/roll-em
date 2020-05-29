import rawParser from "./parser.pegjs";
import { Formula } from "./types";

export { roll } from "./roll";
export { sum } from "./sum";
export * from "./types";

export const parser = rawParser as (string: string) => Formula;
