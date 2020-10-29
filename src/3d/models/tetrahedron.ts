import { ORANGE0, ORANGE_B1, ORANGE_D1 } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/TetrahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n17_96 = 17.962924780409974;
const n6_35 = 6.350852961085885;

const v0 = makeVert(0, -2.018537609795011, 21.90720214718993);
const v1 = makeVert(0, -19.98146239020499, -9.205496225018159);
const v2 = makeVert(-n17_96, 11, -n6_35);
const v3 = makeVert(n17_96, 11, -n6_35);

const faces = [
  makeFace(ORANGE_D1, v0, v3, v2),
  makeFace(ORANGE0, v0, v2, v1),
  makeFace(ORANGE_B1, v0, v1, v3),
];

export const tetrahedron = makePolyhedron(faces);
