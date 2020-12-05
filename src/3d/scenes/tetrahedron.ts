import { ORANGE0, ORANGE_B1, ORANGE_D1 } from "./consts";
import { makePolyhedronScene } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/TetrahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n09 = 0.09175; // 0.0917517095361369
const n28 = 0.28868; // 0.288675134594813
const n41 = 0.41843; // 0.4184316465917345
const n50 = 0.5; // 0.5
const n81 = 0.8165; // 0.8164965809277259
const n90 = 0.90825; // 0.9082482904638632
const n99 = 0.99578; // 0.9957819157813605

export const tetrahedronScene = makePolyhedronScene(
  // prettier-ignore
  [
    0, -n09, n99,
    0, -n90, -n41,
    -n81, n50, -n28,
    n81, n50, -n28,
  ],
  [
    [ORANGE_D1, [0, 3, 2]],
    [ORANGE0, [0, 2, 1]],
    [ORANGE_B1, [0, 1, 3]],
  ]
);
