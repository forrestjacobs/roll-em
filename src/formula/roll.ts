import type { Formula, Result, RollPlan, RollTerm } from "./types";
import { randomInt } from "../utils/rng";
import quickselect from "quickselect";

type Roller = (sides: number) => number;

function randomSide(sides: number): number {
  return randomInt(sides) + 1;
}

function rollDice({ count, sides }: RollPlan, roller: Roller): number[] {
  const value = [];
  for (let rollIndex = 0; rollIndex < count; rollIndex++) {
    value.push(roller(sides));
  }
  return value;
}

function getDroppedIndexes(value: number[], numToDrop: number): number[] {
  const indexes = [];
  for (let i = 0; i < value.length; i++) {
    indexes.push(i);
  }

  if (numToDrop >= value.length) {
    return indexes;
  }

  const compareIndexes = (lhs: number, rhs: number) => value[lhs] - value[rhs];
  quickselect(indexes, numToDrop, 0, indexes.length - 1, compareIndexes);

  indexes.length = numToDrop;
  return indexes.sort();
}

export function roll(formula: Formula, roller: Roller = randomSide): Result {
  return formula.map((term) => {
    if (term.type === "number") {
      return term;
    }
    const value = rollDice(term, roller);
    const result: RollTerm = { value, ...term };
    if (term.dropLowest !== undefined) {
      result.droppedIndexes = getDroppedIndexes(value, term.dropLowest);
    }
    return result;
  });
}
