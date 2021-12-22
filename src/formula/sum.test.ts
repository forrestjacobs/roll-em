import type { NumberTerm, RollTerm } from "./types";
import { sum } from "./sum";

const term2: NumberTerm = {
  type: "number",
  value: 2,
};

const term2d4rolled1and4: RollTerm = {
  type: "roll",
  count: 2,
  sides: 4,
  value: [1, 4],
};

const term5d6d2rolled5and6and3: RollTerm = {
  type: "roll",
  count: 5,
  sides: 6,
  dropLowest: 2,
  value: [5, 3, 6, 2, 3],
  droppedIndexes: [1, 3],
};

test("It can sum a number", () => {
  expect(sum([term2])).toBe(2);
});

test("It can sum a roll", () => {
  expect(sum([term2d4rolled1and4])).toBe(5);
});

test("It can sum a roll with dropped values", () => {
  expect(sum([term5d6d2rolled5and6and3])).toBe(14);
});

test("It can sum multiple terms", () => {
  expect(sum([term2d4rolled1and4, term2])).toBe(7);
});
