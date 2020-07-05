import { Anchor } from "zdog";
import { makeCube } from "./cube";
import { makeSphere } from "./sphere";

export { LEN } from "./consts";

const factories: { [sides: number]: () => Anchor } = {
  6: makeCube,
  100: makeSphere,
};

export function makeModel(sides: number): Anchor {
  const factory = factories[sides];
  return factory ? factory() : new Anchor();
}
