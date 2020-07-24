import type { Anchor } from "zdog";
import { LEN } from "./consts";
import { makeCube } from "./cube";
import { makeCylinder } from "./cylinder";
import { makeDecahedron } from "./decahedron";
import { makeDodecahedron } from "./dodecahedron";
import { makeIcosahedron } from "./icosahedron";
import { makeOctahedron } from "./octahedron";
import { makeSphere } from "./sphere";
import { makeTetrahedron } from "./tetrahedron";

const factories: { [sides: number]: () => Anchor } = {
  2: makeCylinder,
  4: makeTetrahedron,
  6: makeCube,
  8: makeOctahedron,
  10: makeDecahedron,
  12: makeDodecahedron,
  20: makeIcosahedron,
};

export function makeModel(sides: number): Anchor {
  const factory = factories[sides];
  return factory ? factory() : makeSphere();
}

export function getLenth(sides: number): number {
  return sides === 2 ? LEN / 4 : LEN;
}
