import type { NumberTerm, RollPlan } from "./types";
import { roll } from "./roll";

jest.mock("../utils/rng", () => ({
  // Roll the highest possible number
  randomInt: (exclusiveMax: number) => exclusiveMax - 1,
}));

const term2: NumberTerm = {
  type: "number",
  value: 2,
};

const term2d4: RollPlan = {
  type: "roll",
  count: 2,
  sides: 4,
};

const term3d6: RollPlan = {
  type: "roll",
  count: 3,
  sides: 6,
};

test("It passes number literals through", () => {
  expect(roll([term2])).toStrictEqual([term2]);
});

test("It can roll dice", () => {
  expect(roll([term2d4])).toStrictEqual([
    {
      ...term2d4,
      value: [4, 4],
    },
  ]);
});

test("It roll dice from a combined formula", () => {
  expect(roll([term2d4, term2, term3d6])).toStrictEqual([
    {
      ...term2d4,
      value: [4, 4],
    },
    term2,
    {
      ...term3d6,
      value: [6, 6, 6],
    },
  ]);
});
