import { VIOLET0, VIOLET_B1, VIOLET_D1, VIOLET_D2 } from "./consts";
import { makeFace, makePolyhedron } from "./polyhedron";

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

export const decahedron = makePolyhedron(
  [
    0, -n20_09, n8_94,
    0, n20_09, -n8_94,
    0, n11_07, n19_15,
    n11_63, n5_11, n17_20,
    n18_83, n4_88, n5_26,
    n18_83, -n4_88, -n5_26,
    n11_63, -n5_11, -n17_20,
    0, -n11_07, -n19_15,
    -n11_63, -n5_11, -n17_20,
    -n18_83, -n4_88, -n5_26,
    -n18_83, n4_88, n5_26,
    -n11_63, n5_11, n17_20,
  ],
  [
    makeFace(VIOLET_D1, 0, 9, 10, 11),
    makeFace(VIOLET_D2, 1, 10, 11, 2),
    makeFace(VIOLET0, 0, 11, 2, 3),
    makeFace(VIOLET_D1, 1, 2, 3, 4),
    makeFace(VIOLET_B1, 0, 3, 4, 5),
    makeFace(VIOLET_D2, 1, 4, 5, 6),
    makeFace(VIOLET_D2, 1, 6, 7, 8),
    makeFace(VIOLET_D2, 1, 8, 9, 10),
  ]
);
