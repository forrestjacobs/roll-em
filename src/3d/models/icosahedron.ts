import { CYAN0, CYAN_B1, CYAN_B2, CYAN_D1, CYAN_D2 } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

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

const v0 = makeVert(-n11_43, n9_24, n16_01);
const v1 = makeVert(n11_43, n9_24, n16_01);
const v4 = makeVert(0, -n21_73, -n0_65);
const v5 = makeVert(0, -n10_30, n19_14);
const v6 = makeVert(0, n10_30, -n19_14);
const v7 = makeVert(0, n21_73, n0_65);
const v8 = makeVert(n18_49, n9_90, -n5_71);
const v9 = makeVert(n18_49, -n9_90, n5_71);
const v10 = makeVert(-n18_49, n9_90, -n5_71);
const v11 = makeVert(-n18_49, -n9_90, n5_71);

const faces = [
  makeFace(CYAN_B2, v4, v9, v5),
  makeFace(CYAN_B1, v5, v11, v4),
  makeFace(CYAN_B1, v1, v5, v9),
  makeFace(CYAN_B1, v9, v8, v1),
  makeFace(CYAN0, v0, v11, v5),
  makeFace(CYAN0, v0, v5, v1),
  makeFace(CYAN_D1, v0, v1, v7),
  makeFace(CYAN_D1, v0, v10, v11),
  makeFace(CYAN_D1, v7, v1, v8),
  makeFace(CYAN_D2, v0, v7, v10),
  makeFace(CYAN_D2, v10, v7, v6),
  makeFace(CYAN_D2, v8, v6, v7),
];

export const icosahedron = makePolyhedron(faces);
