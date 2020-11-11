import { CYAN0, CYAN_B1, CYAN_B2, CYAN_D1, CYAN_D2 } from "./consts";
import { makeFace, makePolyhedron } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/master/src/geometries/IcosahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n0_65 = 0.6516936462691122;
const n5_71 = 5.715767664977297;
const n9_24 = 9.248306353730888;
const n9_90 = 9.9;
const n10_30 = 10.302768823646662;
const n11_43 = 11.43153532995459;
const n16_01 = 16.01853648862396;
const n18_49 = 18.49661270746177;
const n19_14 = 19.14830635373089;
const n21_73 = 21.734304153601254;

export const icosahedron = makePolyhedron(
  [
    -n11_43, n9_24, n16_01,
    n11_43, n9_24, n16_01,
    0, -n21_73, -n0_65,
    0, -n10_30, n19_14,
    0, n10_30, -n19_14,
    0, n21_73, n0_65,
    n18_49, n9_90, -n5_71,
    n18_49, -n9_90, n5_71,
    -n18_49, n9_90, -n5_71,
    -n18_49, -n9_90, n5_71,
  ],
  [
    makeFace(CYAN_B2, 2, 7, 3),
    makeFace(CYAN_B1, 3, 9, 2),
    makeFace(CYAN_B1, 1, 3, 7),
    makeFace(CYAN_B1, 7, 6, 1),
    makeFace(CYAN0, 0, 9, 3),
    makeFace(CYAN0, 0, 3, 1),
    makeFace(CYAN_D1, 0, 1, 5),
    makeFace(CYAN_D1, 0, 8, 9),
    makeFace(CYAN_D1, 5, 1, 6),
    makeFace(CYAN_D2, 0, 5, 8),
    makeFace(CYAN_D2, 8, 5, 4),
    makeFace(CYAN_D2, 6, 4, 5),
  ]
);
