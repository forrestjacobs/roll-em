import { BLUE0, BLUE_B1, BLUE_B2, BLUE_D1, BLUE_D2 } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/master/src/geometries/DodecahedronGeometry.js
 * which is licensed under the MIT License.
 */

const n3_47 = 3.4775220723410323;
const n3_92 = 3.92504298750399;
const n4_64 = 4.649147038914115;
const n6_79 = 6.798373876248843;
const n7_85 = 7.850085975007978;
const n10_27 = 10.275895948589875;
const n12_70 = 12.701705922171767;
const n13_87 = 13.873330888744853;
const n17_07 = 17.07426982483872;
const n17_35 = 17.350852961085884;
const n17_79 = 17.798373876248842;
const n20_55 = 20.551791897179747;
const n21_72 = 21.72341686375283;

export const dodecahedron = makePolyhedron(
  [
    makeVert(-n12_70, n4_64, -n17_35),
    makeVert(-n12_70, -n17_35, -n4_64),
    makeVert(-n12_70, n17_35, n4_64),
    makeVert(-n12_70, -n4_64, n17_35),
    makeVert(n12_70, n4_64, -n17_35),
    makeVert(n12_70, -n17_35, -n4_64),
    makeVert(n12_70, n17_35, n4_64),
    makeVert(n12_70, -n4_64, n17_35),
    makeVert(0, n13_87, -n17_07),
    makeVert(0, -n21_72, n3_47),
    makeVert(0, n21_72, -n3_47),
    makeVert(0, -n13_87, n17_07),
    makeVert(-n7_85, n10_27, n17_79),
    makeVert(n7_85, n10_27, n17_79),
    makeVert(-n20_55, n6_79, -n3_92),
    makeVert(n20_55, n6_79, -n3_92),
    makeVert(-n20_55, -n6_79, n3_92),
    makeVert(n20_55, -n6_79, n3_92),
  ],
  [
    makeFace(BLUE_B2, 11, 9, 5, 17, 7),
    makeFace(BLUE_B1, 16, 1, 9, 11, 3),
    makeFace(BLUE0, 3, 11, 7, 13, 12),
    makeFace(BLUE0, 7, 17, 15, 6, 13),
    makeFace(BLUE_D1, 2, 14, 16, 3, 12),
    makeFace(BLUE_D1, 6, 10, 2, 12, 13),
    makeFace(BLUE_D2, 15, 4, 8, 10, 6),
    makeFace(BLUE_D2, 8, 0, 14, 2, 10),
  ]
);
