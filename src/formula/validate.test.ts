import { validate } from "./validate";

it("limits the number of die sides", () => {
  expect(() => validate([{ type: "roll", count: 1, sides: 1001 }])).toThrow(
    "Cannot roll a die with more than 1000 sides"
  );
});

it("limits the range of added numbers", () => {
  expect(() => validate([{ type: "number", value: 5001 }])).toThrow(
    "Cannot add a number greater than 5000 or less than -5000"
  );
  expect(() => validate([{ type: "number", value: -5001 }])).toThrow(
    "Cannot add a number greater than 5000 or less than -5000"
  );
});

it("limits the number of terms", () => {
  expect(() =>
    validate([
      { type: "roll", count: 4999, sides: 100 },
      { type: "number", value: 10 },
      { type: "number", value: 15 },
    ])
  ).toThrow("Cannot add more than 5000 dice and numbers");
});

it("allows a formula close to the limits", () => {
  expect(() =>
    validate([
      { type: "roll", count: 4998, sides: 1000 },
      { type: "number", value: 5000 },
      { type: "number", value: -5000 },
    ])
  ).not.toThrow();
});
