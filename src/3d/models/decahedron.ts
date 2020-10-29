import { VIOLET0, VIOLET_B1, VIOLET_D1, VIOLET_D2 } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

const n4_88 = 4.886950091276799;
const n5_11 = 5.117448520156342;
const n5_26 = 5.265936315482162;
const n8_94 = 8.948206147667603;
const n11_07 = 11.070008470144732;
const n11_63 = 11.638147995390968;
const n17_20 = 17.204310866592955;
const n18_83 = 18.830919022644043;
const n19_15 = 19.15331280961613;
const n20_09 = 20.098000068137218;

const y0 = makeVert(0, -n20_09, n8_94);
const y1 = makeVert(0, n20_09, -n8_94);
const v0 = makeVert(0, n11_07, n19_15);
const v1 = makeVert(n11_63, n5_11, n17_20);
const v2 = makeVert(n18_83, n4_88, n5_26);
const v3 = makeVert(n18_83, -n4_88, -n5_26);
const v4 = makeVert(n11_63, -n5_11, -n17_20);
const v5 = makeVert(0, -n11_07, -n19_15);
const v6 = makeVert(-n11_63, -n5_11, -n17_20);
const v7 = makeVert(-n18_83, -n4_88, -n5_26);
const v8 = makeVert(-n18_83, n4_88, n5_26);
const v9 = makeVert(-n11_63, n5_11, n17_20);

export const decahedron = makePolyhedron([
  makeFace(VIOLET_D1, y0, v7, v8, v9),
  makeFace(VIOLET_D2, y1, v8, v9, v0),
  makeFace(VIOLET0, y0, v9, v0, v1),
  makeFace(VIOLET_D1, y1, v0, v1, v2),
  makeFace(VIOLET_B1, y0, v1, v2, v3),
  makeFace(VIOLET_D2, y1, v2, v3, v4),
  makeFace(VIOLET_D2, y1, v4, v5, v6),
  makeFace(VIOLET_D2, y1, v6, v7, v8),
]);
