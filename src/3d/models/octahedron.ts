import { Anchor } from "zdog";
import { RADIUS } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/OctahedronGeometry.js
 * which is licensed under the MIT License.
 */

const v0 = makeVert(RADIUS, 0, 0);
const v1 = makeVert(-RADIUS, 0, 0);
const v2 = makeVert(0, RADIUS, 0);
const v3 = makeVert(0, -RADIUS, 0);
const v4 = makeVert(0, 0, RADIUS);
const v5 = makeVert(0, 0, -RADIUS);

const faces = [
  makeFace(-2, v0, v5, v2),
  makeFace(-2, v1, v4, v2),
  makeFace(-1, v0, v2, v4),
  makeFace(0, v1, v3, v4),
  makeFace(1, v0, v4, v3),
  makeFace(2, v0, v3, v5),
];

export function makeOctahedron(): Anchor {
  const poly = makePolyhedron(faces);
  poly.rotate.x = -Math.PI / 6;
  poly.rotate.y = Math.PI / 4;
  return poly;
}
