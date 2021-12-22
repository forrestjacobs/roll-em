import { mocked } from "ts-jest/utils";
import { randomInt } from "../utils/rng";
import { roll } from "./roll";
import type { NumberTerm, RollPlan } from "./types";

jest.mock("../utils/rng");

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

const term5d6d2: RollPlan = {
  type: "roll",
  count: 5,
  sides: 6,
  dropLowest: 2,
};

const term2d6d3: RollPlan = {
  type: "roll",
  count: 2,
  sides: 6,
  dropLowest: 3,
};

test("It passes number literals through", () => {
  expect(roll([term2])).toStrictEqual([term2]);
});

test("It can roll dice", () => {
  mocked(randomInt).mockImplementation((n) => n - 1);
  expect(roll([term2d4])).toStrictEqual([
    {
      ...term2d4,
      value: [4, 4],
    },
  ]);
});

test("It can drop dice", () => {
  mocked(randomInt)
    .mockImplementationOnce(() => 4)
    .mockImplementationOnce(() => 2)
    .mockImplementationOnce(() => 5)
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 2);

  expect(roll([term5d6d2])).toStrictEqual([
    {
      ...term5d6d2,
      value: [5, 3, 6, 2, 3],
      droppedIndexes: [1, 3],
    },
  ]);
});

test("It can handle more dropped than rolled dice", () => {
  expect(roll([term2d6d3])).toStrictEqual([
    {
      ...term2d6d3,
      value: [6, 6],
      droppedIndexes: [0, 1],
    },
  ]);
});

test("It roll dice from a combined formula", () => {
  mocked(randomInt).mockImplementation((n) => n - 1);
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
