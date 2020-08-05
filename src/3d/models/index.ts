import type { Anchor } from "zdog";
import { LEN } from "./consts";
import { cube } from "./cube";
import { cylinder } from "./cylinder";
import { decahedron } from "./decahedron";
import { dodecahedron } from "./dodecahedron";
import { icosahedron } from "./icosahedron";
import { octahedron } from "./octahedron";
import { sphere } from "./sphere";
import { tetrahedron } from "./tetrahedron";

export { RADIUS } from "./consts";

const shapes: { [sides: number]: Anchor } = {
  2: cylinder,
  4: tetrahedron,
  6: cube,
  8: octahedron,
  10: decahedron,
  12: dodecahedron,
  20: icosahedron,
};

export function makeModel(sides: number): Anchor {
  const shape = shapes[sides] ?? sphere;
  return shape.copyGraph();
}

export function getLength(sides: number): number {
  return sides === 2 ? LEN / 4 : LEN;
}
