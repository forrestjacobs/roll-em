import type { Anchor } from "zdog";
import { BLUE, RADIUS } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/master/src/geometries/DodecahedronGeometry.js
 * which is licensed under the MIT License.
 */

const l = RADIUS / Math.sqrt(3);
const t = (l * (1 + Math.sqrt(5))) / 2;
const r = (l * l) / t;

// (±1, ±1, ±1)
const v00 = makeVert(-l, -l, -l);
const v01 = makeVert(-l, -l, l);
const v02 = makeVert(-l, l, -l);
const v03 = makeVert(-l, l, l);
const v04 = makeVert(l, -l, -l);
const v05 = makeVert(l, -l, l);
const v06 = makeVert(l, l, -l);
const v07 = makeVert(l, l, l);

// (0, ±1/φ, ±φ)
const v08 = makeVert(0, -r, -t);
const v09 = makeVert(0, -r, t);
const v10 = makeVert(0, r, -t);
const v11 = makeVert(0, r, t);

// (±1/φ, ±φ, 0)
// Not visible:
// const v12 = makeVert(-r, -t, 0);
const v13 = makeVert(-r, t, 0);
// Not visible:
// const v14 = makeVert(r, -t, 0);
const v15 = makeVert(r, t, 0);

// (±φ, 0, ±1/φ)
const v16 = makeVert(-t, 0, -r);
const v17 = makeVert(t, 0, -r);
const v18 = makeVert(-t, 0, r);
const v19 = makeVert(t, 0, r);

const faces = [
  makeFace(BLUE, 2, v11, v09, v05, v19, v07),
  makeFace(BLUE, 1, v18, v01, v09, v11, v03),
  makeFace(BLUE, 0, v03, v11, v07, v15, v13),
  makeFace(BLUE, 0, v07, v19, v17, v06, v15),
  makeFace(BLUE, -1, v02, v16, v18, v03, v13),
  makeFace(BLUE, -1, v06, v10, v02, v13, v15),

  makeFace(BLUE, -2, v17, v04, v08, v10, v06),
  makeFace(BLUE, -2, v08, v00, v16, v02, v10),
  // Not visible:
  // makeFace(BLUE, -2, v00, v12, v01, v18, v16),
  // makeFace(BLUE, -2, v04, v14, v12, v00, v08),
  // makeFace(BLUE, -2, v19, v05, v14, v04, v17),
  // makeFace(BLUE, -2, v01, v12, v14, v05, v09),
];

export function makeDodecahedron(): Anchor {
  const poly = makePolyhedron(faces);
  poly.rotate.x = Math.PI / 3;
  return poly;
}
