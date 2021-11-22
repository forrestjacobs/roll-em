import { CYAN0, CYAN_B1, CYAN_B2, CYAN_D1, CYAN_D2 } from "./consts";
import { makePolyhedronScene } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/master/src/geometries/IcosahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n02 = 0.02962; // 0.0296224384667778
const n25 = 0.25981; // 0.2598076211353317
const n42 = 0.42038; // 0.4203775615332222
const n45 = 0.45; // 0.45
const n46 = 0.46831; // 0.4683076738021209
const n51 = 0.51962; // 0.5196152422706632
const n72 = 0.72812; // 0.7281152949374527
const n84 = 0.84076; // 0.8407551230664441
const n87 = 0.87038; // 0.8703775615332223
const n98 = 0.98792; // 0.9879229160727841

export const icosahedronScene = makePolyhedronScene(
  CYAN0,
  // prettier-ignore
  [
    -n51, n42, n72,
    n51, n42, n72,
    0, -n98, -n02,
    0, -n46, n87,
    0, n46, -n87,
    0, n98, n02,
    n84, n45, -n25,
    n84, -n45, n25,
    -n84, n45, -n25,
    -n84, -n45, n25,
  ],
  [
    [CYAN_B2, [2, 7, 3]],
    [CYAN_B1, [3, 9, 2]],
    [CYAN_B1, [1, 3, 7]],
    [CYAN_B1, [7, 6, 1]],
    [CYAN0, [0, 9, 3]],
    [CYAN0, [0, 3, 1]],
    [CYAN_D1, [0, 1, 5]],
    [CYAN_D1, [0, 8, 9]],
    [CYAN_D1, [5, 1, 6]],
    [CYAN_D2, [0, 5, 8]],
    [CYAN_D2, [8, 5, 4]],
    [CYAN_D2, [6, 4, 5]],
  ]
);
