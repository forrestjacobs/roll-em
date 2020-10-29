import {
  MAGENTA0,
  MAGENTA_B1,
  MAGENTA_B2,
  MAGENTA_D1,
  MAGENTA_D2,
} from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/OctahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n7_77 = 7.7781745930520225;
const n13_47 = 13.472193585307481;
const n15_55 = 15.556349186104047;
const n19_05 = 19.052558883257653;
const n10_99 = 10.999999999999998;

const v0 = makeVert(n15_55, n7_77, n13_47);
const v1 = makeVert(-n15_55, -n7_77, -n13_47);
const v2 = makeVert(0, n19_05, -n10_99);
const v3 = makeVert(0, -n19_05, n10_99);
const v4 = makeVert(-n15_55, n7_77, n13_47);
const v5 = makeVert(n15_55, -n7_77, -n13_47);

const faces = [
  makeFace(MAGENTA_D2, v0, v5, v2),
  makeFace(MAGENTA_D2, v1, v4, v2),
  makeFace(MAGENTA_D1, v0, v2, v4),
  makeFace(MAGENTA0, v0, v4, v3),
  makeFace(MAGENTA_B1, v1, v3, v4),
  makeFace(MAGENTA_B2, v0, v3, v5),
];

export const octahedron = makePolyhedron(faces);
