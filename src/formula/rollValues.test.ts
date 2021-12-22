import { rollValues } from ".";
import type { RollTerm, RollValue } from "./types";

const term5d6d2: RollTerm = {
  type: "roll",
  count: 5,
  sides: 6,
  dropLowest: 2,
  value: [5, 3, 6, 2, 3],
  droppedIndexes: [1, 3],
};

function makeIteration(
  value: number,
  drop = false
): IteratorYieldResult<RollValue> {
  return {
    done: false,
    value: {
      value,
      drop,
    },
  };
}

test("It can iterate over roll values", () => {
  const gen = rollValues(term5d6d2);
  expect(gen.next()).toStrictEqual(makeIteration(5));
  expect(gen.next()).toStrictEqual(makeIteration(3, true));
  expect(gen.next()).toStrictEqual(makeIteration(6));
  expect(gen.next()).toStrictEqual(makeIteration(2, true));
  expect(gen.next()).toStrictEqual(makeIteration(3));
  expect(gen.next()).toStrictEqual({
    done: true,
    value: undefined,
  });
});
