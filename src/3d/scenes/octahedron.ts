import {
  MAGENTA0,
  MAGENTA_B1,
  MAGENTA_B2,
  MAGENTA_D1,
  MAGENTA_D2,
} from "./consts";
import { makePolyhedronScene } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/OctahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n35 = 0.35355; // 0.3535533905932737
const n61 = 0.61237; // 0.6123724356957945
const n70 = 0.70711; // 0.7071067811865473
const n86 = 0.86603; // 0.8660254037844386
const n50 = 0.5; // 0.5

export const octahedronScene = makePolyhedronScene(
  MAGENTA0,
  // prettier-ignore
  [
    n70, n35, n61,
    -n70, -n35, -n61,
    0, n86, -n50,
    0, -n86, n50,
    -n70, n35, n61,
    n70, -n35, -n61,
  ],
  [
    [MAGENTA_D2, [0, 5, 2]],
    [MAGENTA_D2, [1, 4, 2]],
    [MAGENTA_D1, [0, 2, 4]],
    [MAGENTA0, [0, 4, 3]],
    [MAGENTA_B1, [1, 3, 4]],
    [MAGENTA_B2, [0, 3, 5]],
  ]
);
