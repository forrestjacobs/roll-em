import { sum } from "./sum";

test("It can sum a number", () => {
  expect(
    sum([
      {
        sign: 1,
        type: "number",
        value: 2,
      },
    ])
  ).toBe(2);
});

test("It can sum a roll", () => {
  expect(
    sum([
      {
        sign: 1,
        type: "roll",
        count: 2,
        sides: 4,
        value: [1, 4]
      },
    ])
  ).toBe(5);
});

test("It can sum multiple terms", () => {
  expect(
    sum([
      {
        sign: 1,
        type: "roll",
        count: 2,
        sides: 4,
        value: [1, 4]
      },
      {
        sign: 1,
        type: "number",
        value: 2,
      },
    ])
  ).toBe(7);
});

test("It can subtract terms", () => {
  expect(
    sum([
      {
        sign: 1,
        type: "roll",
        count: 2,
        sides: 4,
        value: [1, 4]
      },
      {
        sign: -1,
        type: "number",
        value: 2,
      },
    ])
  ).toBe(3);
});
