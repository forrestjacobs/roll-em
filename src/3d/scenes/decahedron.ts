import { VIOLET0, VIOLET_B1, VIOLET_D1, VIOLET_D2 } from "./consts";
import { makeFace, makePolyhedronScene } from "./polyhedron";

const n22 = 0.22213; // 0.2221340950580363
const n232 = 0.23261; // 0.2326112963707428
const n239 = 0.23936; // 0.2393607416128255
const n40 = 0.40674; // 0.4067366430758001
const n50 = 0.50318; // 0.5031822031883968
const n52 = 0.52901; // 0.5290067270632255
const n78 = 0.78201; // 0.7820141302996795
const n85 = 0.85595; // 0.8559508646656382
const n87 = 0.87061; // 0.8706051277098241
const n91 = 0.91355; // 0.9135454576426005

export const decahedronScene = makePolyhedronScene(
  [
    0, -n91, n40,
    0, n91, -n40,
    0, n50, n87,
    n52, n232, n78,
    n85, n22, n239,
    n85, -n22, -n239,
    n52, -n232, -n78,
    0, -n50, -n87,
    -n52, -n232, -n78,
    -n85, -n22, -n239,
    -n85, n22, n239,
    -n52, n232, n78,
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
