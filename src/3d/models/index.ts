import { Anchor } from "zdog";
import { makeCube } from "./cube";

export { LEN } from "./consts";

const factories: { [sides: number]: () => Anchor } = {
  6: makeCube,
};

export function makeModel(sides: number): Anchor {
  const factory = factories[sides];
  return factory ? factory() : new Anchor();
}
