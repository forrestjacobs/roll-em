import { BLUE0, BLUE_B1, BLUE_B2, BLUE_D1, BLUE_D2 } from "./consts";
import { makePolyhedronScene } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/master/src/geometries/DodecahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n15 = 0.15807; // 0.1580691851064105
const n17 = 0.17841; // 0.178411044886545
const n21 = 0.21132; // 0.211324865405187
const n30 = 0.30902; // 0.3090169943749474
const n35 = 0.35682; // 0.3568220897730899
const n46 = 0.46709; // 0.4670861794813577
const n57 = 0.57735; // 0.5773502691896255
const n63 = 0.63061; // 0.6306059494884023
const n77 = 0.7761; // 0.7761031738563055
const n78 = 0.78868; // 0.7886751345948127
const n80 = 0.80902; // 0.8090169943749473
const n93 = 0.93417; // 0.9341723589627155
const n98 = 0.98743; // 0.9874280392614923

export const dodecahedronScene = makePolyhedronScene(
  // prettier-ignore
  [
    -n57, n21, -n78,
    -n57, -n78, -n21,
    -n57, n78, n21,
    -n57, -n21, n78,
    n57, n21, -n78,
    n57, -n78, -n21,
    n57, n78, n21,
    n57, -n21, n78,
    0, n63, -n77,
    0, -n98, n15,
    0, n98, -n15,
    0, -n63, n77,
    -n35, n46, n80,
    n35, n46, n80,
    -n93, n30, -n17,
    n93, n30, -n17,
    -n93, -n30, n17,
    n93, -n30, n17,
  ],
  [
    [BLUE_B2, [11, 9, 5, 17, 7]],
    [BLUE_B1, [16, 1, 9, 11, 3]],
    [BLUE0, [3, 11, 7, 13, 12]],
    [BLUE0, [7, 17, 15, 6, 13]],
    [BLUE_D1, [2, 14, 16, 3, 12]],
    [BLUE_D1, [6, 10, 2, 12, 13]],
    [BLUE_D2, [15, 4, 8, 10, 6]],
    [BLUE_D2, [8, 0, 14, 2, 10]],
  ]
);
