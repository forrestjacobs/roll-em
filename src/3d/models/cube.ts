import { RED0, RED_B1, RED_B2, RED_D1 } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

const n15_55 = 15.55634918610405;

const v000 = makeVert(-n15_55, -n15_55, -n15_55);
const v001 = makeVert(-n15_55, -n15_55, n15_55);
const v010 = makeVert(-n15_55, n15_55, -n15_55);
const v011 = makeVert(-n15_55, n15_55, n15_55);
const v100 = makeVert(n15_55, -n15_55, -n15_55);
const v101 = makeVert(n15_55, -n15_55, n15_55);
const v110 = makeVert(n15_55, n15_55, -n15_55);
const v111 = makeVert(n15_55, n15_55, n15_55);

export const cube = makePolyhedron([
  makeFace(RED_B2, v000, v100, v101, v001),
  makeFace(RED_B1, v000, v010, v011, v001),
  makeFace(RED_B1, v100, v110, v111, v101),
  makeFace(RED0, v001, v101, v111, v011),
  makeFace(RED_D1, v110, v010, v011, v111),
]);
