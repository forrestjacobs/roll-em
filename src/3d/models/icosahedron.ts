import type { Anchor } from "zdog";
import { RADIUS, CYAN } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/master/src/geometries/IcosahedronGeometry.js
 * which is licensed under the MIT License.
 */

const l = RADIUS / Math.sqrt(3);
const t = (l * (1 + Math.sqrt(5))) / 2;

const v0 = makeVert(-l, t, 0);
const v1 = makeVert(l, t, 0);
// Not visible:
// const v2 = makeVert(-l, -t, 0);
// const v3 = makeVert(l, -t, 0);
const v4 = makeVert(0, -l, t);
const v5 = makeVert(0, l, t);
const v6 = makeVert(0, -l, -t);
const v7 = makeVert(0, l, -t);
const v8 = makeVert(t, 0, -l);
const v9 = makeVert(t, 0, l);
const v10 = makeVert(-t, 0, -l);
const v11 = makeVert(-t, 0, l);

const faces = [
  makeFace(CYAN, 2, v4, v9, v5),
  makeFace(CYAN, 1, v5, v11, v4),
  makeFace(CYAN, 1, v1, v5, v9),
  makeFace(CYAN, 1, v9, v8, v1),
  makeFace(CYAN, 0, v0, v11, v5),
  makeFace(CYAN, 0, v0, v5, v1),
  makeFace(CYAN, -1, v0, v1, v7),
  makeFace(CYAN, -1, v0, v10, v11),
  makeFace(CYAN, -1, v7, v1, v8),
  makeFace(CYAN, -2, v0, v7, v10),
  makeFace(CYAN, -2, v10, v7, v6),
  makeFace(CYAN, -2, v8, v6, v7),
  // Not visible:
  // makeFace(CYAN, -2, v11, v10, v2),
  // makeFace(CYAN, -2, v3, v9, v4),
  // makeFace(CYAN, -2, v3, v4, v2),
  // makeFace(CYAN, -2, v3, v2, v6),
  // makeFace(CYAN, -2, v3, v6, v8),
  // makeFace(CYAN, -2, v3, v8, v9),
  // makeFace(CYAN, -2, v2, v4, v11),
  // makeFace(CYAN, -2, v6, v2, v10),
];

export function makeIcosahedron(): Anchor {
  const poly = makePolyhedron(faces);
  poly.rotate.x = Math.PI / 3;
  poly.scale.multiply(0.9);
  return poly;
}
