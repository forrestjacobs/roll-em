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

test("It can sum a number", () => {
  expect(sum([term2])).toBe(2);
});

test("It can sum a roll", () => {
  expect(sum([term2d4rolled1and4])).toBe(5);
});

test("It can sum multiple terms", () => {
  expect(sum([term2d4rolled1and4, term2])).toBe(7);
});
