import { ORANGE0, ORANGE_B1, ORANGE_D1 } from "./consts";
import { makeFace, makePolyhedron } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/TetrahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n17_96 = 17.962924780409974;
const n6_35 = 6.350852961085885;

export const tetrahedron = makePolyhedron(
  [
    0, -2.018537609795011, 21.90720214718993,
    0, -19.98146239020499, -9.205496225018159,
    -n17_96, 11, -n6_35,
    n17_96, 11, -n6_35,
  ],
  [
    makeFace(ORANGE_D1, 0, 3, 2),
    makeFace(ORANGE0, 0, 2, 1),
    makeFace(ORANGE_B1, 0, 1, 3),
  ]
);
