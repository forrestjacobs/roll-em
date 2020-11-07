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

export const octahedron = makePolyhedron(
  [
    makeVert(n15_55, n7_77, n13_47),
    makeVert(-n15_55, -n7_77, -n13_47),
    makeVert(0, n19_05, -n10_99),
    makeVert(0, -n19_05, n10_99),
    makeVert(-n15_55, n7_77, n13_47),
    makeVert(n15_55, -n7_77, -n13_47),
  ],
  [
    makeFace(MAGENTA_D2, 0, 5, 2),
    makeFace(MAGENTA_D2, 1, 4, 2),
    makeFace(MAGENTA_D1, 0, 2, 4),
    makeFace(MAGENTA0, 0, 4, 3),
    makeFace(MAGENTA_B1, 1, 3, 4),
    makeFace(MAGENTA_B2, 0, 3, 5),
  ]
);
