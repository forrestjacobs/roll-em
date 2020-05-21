import { NumberTerm, RollPlan } from "./Formula";
import { roll } from "./roll";

jest.mock("./rng", () => ({
  // Roll the highest possible number
  randomInt: (exclusiveMax: number) => exclusiveMax - 1,
}));

const term2: NumberTerm = {
  sign: 1,
  type: "number",
  value: 2,
};

const term2d4: RollPlan = {
  sign: 1,
  type: "roll",
  count: 2,
  sides: 4,
};

const term3d6: RollPlan = {
  sign: 1,
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
