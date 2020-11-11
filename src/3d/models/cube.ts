import { RED0, RED_B1, RED_B2, RED_D1 } from "./consts";
import { makeFace, makePolyhedron } from "./polyhedron";

const n15_55 = 15.55634918610405;

export const cube = makePolyhedron(
  [
    -n15_55, -n15_55, -n15_55,
    -n15_55, -n15_55, n15_55,
    -n15_55, n15_55, -n15_55,
    -n15_55, n15_55, n15_55,
    n15_55, -n15_55, -n15_55,
    n15_55, -n15_55, n15_55,
    n15_55, n15_55, -n15_55,
    n15_55, n15_55, n15_55,
  ],
  [
    makeFace(RED_B2, 0, 4, 5, 1),
    makeFace(RED_B1, 0, 2, 3, 1),
    makeFace(RED_B1, 4, 6, 7, 5),
    makeFace(RED0, 1, 5, 7, 3),
    makeFace(RED_D1, 6, 2, 3, 7),
  ]
);
