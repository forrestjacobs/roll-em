import type { RollTerm, RollValue } from "./types";

export function* rollValues(term: RollTerm): Generator<RollValue, void> {
  const droppedIndexes = term.droppedIndexes ?? [];
  let dropIndex = 0;
  for (let index = 0; index < term.value.length; index++) {
    const value = term.value[index];
    const drop =
      dropIndex < droppedIndexes.length && droppedIndexes[dropIndex] === index;
    yield { value, drop };
    if (drop) {
      dropIndex++;
    }
  }
}
