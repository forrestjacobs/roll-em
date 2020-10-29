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

const v00 = makeVert(-n12_70, n4_64, -n17_35);
const v01 = makeVert(-n12_70, -n17_35, -n4_64);
const v02 = makeVert(-n12_70, n17_35, n4_64);
const v03 = makeVert(-n12_70, -n4_64, n17_35);
const v04 = makeVert(n12_70, n4_64, -n17_35);
const v05 = makeVert(n12_70, -n17_35, -n4_64);
const v06 = makeVert(n12_70, n17_35, n4_64);
const v07 = makeVert(n12_70, -n4_64, n17_35);
const v08 = makeVert(0, n13_87, -n17_07);
const v09 = makeVert(0, -n21_72, n3_47);
const v10 = makeVert(0, n21_72, -n3_47);
const v11 = makeVert(0, -n13_87, n17_07);
const v13 = makeVert(-n7_85, n10_27, n17_79);
const v15 = makeVert(n7_85, n10_27, n17_79);
const v16 = makeVert(-n20_55, n6_79, -n3_92);
const v17 = makeVert(n20_55, n6_79, -n3_92);
const v18 = makeVert(-n20_55, -n6_79, n3_92);
const v19 = makeVert(n20_55, -n6_79, n3_92);

const faces = [
  makeFace(BLUE_B2, v11, v09, v05, v19, v07),
  makeFace(BLUE_B1, v18, v01, v09, v11, v03),
  makeFace(BLUE0, v03, v11, v07, v15, v13),
  makeFace(BLUE0, v07, v19, v17, v06, v15),
  makeFace(BLUE_D1, v02, v16, v18, v03, v13),
  makeFace(BLUE_D1, v06, v10, v02, v13, v15),
  makeFace(BLUE_D2, v17, v04, v08, v10, v06),
  makeFace(BLUE_D2, v08, v00, v16, v02, v10),
];

export const dodecahedron = makePolyhedron(faces);
