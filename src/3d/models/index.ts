import { LEN, Renderer, RendererFactory } from "./consts";
import { cube } from "./cube";
import { makeCylinder } from "./cylinder";
import { decahedron } from "./decahedron";
import { dodecahedron } from "./dodecahedron";
import { icosahedron } from "./icosahedron";
import { octahedron } from "./octahedron";
import { makeSphere } from "./sphere";
import { tetrahedron } from "./tetrahedron";

export { PI, RADIUS } from "./consts";
export type { Renderer } from "./consts";

const shapes: { [sides: number]: RendererFactory } = {
  2: makeCylinder,
  4: tetrahedron,
  6: cube,
  8: octahedron,
  10: decahedron,
  12: dodecahedron,
  20: icosahedron,
};

export function getRenderer(
  sides: number,
  x: number,
  y: number,
  z: number
): Renderer {
  const factory = shapes[sides] ?? makeSphere;
  return factory(x, y, z);
}

export function getLength(sides: number): number {
  return sides === 2 ? LEN / 4 : LEN;
}
