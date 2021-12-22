import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import escapeStringRegexp from "escape-string-regexp";
import type { NumberTerm, RollTerm } from "../formula";
import MockDieRoll from "./MockDieRoll.svelte";
import Result from "./Result.svelte";

jest.mock("./DieRoll.svelte", () => ({
  default: MockDieRoll,
}));

const term2: NumberTerm = {
  type: "number",
  value: 2,
};

const termNegative2: NumberTerm = {
  type: "number",
  value: -2,
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

const overflowTerm: RollTerm = {
  type: "roll",
  count: 20,
  sides: 4,
  value: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
};

function matchExactly(string: string) {
  return new RegExp(`^${escapeStringRegexp(string)}$`);
}

test("It renders a number", () => {
  const { container } = render(Result, {
    animated: false,
    result: [term2],
  });
  expect(container).toHaveTextContent(matchExactly("2"));
});

test("It renders a dice formula", () => {
  const { container } = render(Result, {
    animated: false,
    result: [term2d4rolled1and4],
  });
  expect(container).toHaveTextContent(matchExactly("[d4: 1] + [d4: 4]"));
});

test("It renders dropped dice", () => {
  const { container } = render(Result, {
    animated: false,
    result: [term5d6d2rolled5and6and3],
  });
  expect(container).toHaveTextContent(
    matchExactly("[d6: 5] + ~[d6: 3] + [d6: 6] + ~[d6: 2] + [d6: 3]")
  );
});

test("It only renders the first 15 dice in a term", () => {
  const { container } = render(Result, {
    animated: false,
    result: [overflowTerm],
  });
  expect(container).toHaveTextContent(
    matchExactly(
      "[d4: 1] + [d4: 2] + [d4: 3] + [d4: 4] + [d4: 1] + [d4: 2] + [d4: 3] + [d4: 4] + [d4: 1] + [d4: 2] + [d4: 3] + [d4: 4] + [d4: 1] + [d4: 2] + [d4: 3] + 5 more"
    )
  );
});

test("It renders multiple terms", () => {
  const { container } = render(Result, {
    animated: false,
    result: [term2d4rolled1and4, term2],
  });
  expect(container).toHaveTextContent(matchExactly("[d4: 1] + [d4: 4] + 2"));
});

test("It renders subtracted terms", () => {
  const { container } = render(Result, {
    animated: false,
    result: [term2d4rolled1and4, termNegative2],
  });
  expect(container).toHaveTextContent(matchExactly("[d4: 1] + [d4: 4] - 2"));
});
