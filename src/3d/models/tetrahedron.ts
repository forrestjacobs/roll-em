import { Anchor } from "zdog";
import { RADIUS } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/TetrahedronGeometry.js
 * which is licensed under the MIT License.
 */

const l = RADIUS / Math.sqrt(3);

const v0 = makeVert(l, l, l);
const v1 = makeVert(-l, -l, l);
const v2 = makeVert(-l, l, -l);
const v3 = makeVert(l, -l, -l);

const faces = [
  makeFace(v0, v3, v2, -1),
  makeFace(v0, v2, v1, 0),
  makeFace(v0, v1, v3, 1),
];

export function makeTetrahedron(): Anchor {
  const poly = makePolyhedron(faces);
  poly.rotate.x = Math.PI / 3;
  poly.rotate.z = Math.PI / 4;
  return poly;
}
