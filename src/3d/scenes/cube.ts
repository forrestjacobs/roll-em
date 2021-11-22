import { RED0, RED_B1, RED_B2, RED_D1 } from "./consts";
import { makePolyhedronScene } from "./polyhedron";

const n = 0.70711; // 0.7071067811865477

export const cubeScene = makePolyhedronScene(
  RED0,
  // prettier-ignore
  [
    -n, -n, -n,
    -n, -n, n,
    -n, n, -n,
    -n, n, n,
    n, -n, -n,
    n, -n, n,
    n, n, -n,
    n, n, n,
  ],
  [
    [RED_B2, [0, 4, 5, 1]],
    [RED_B1, [0, 2, 3, 1]],
    [RED_B1, [4, 6, 7, 5]],
    [RED0, [1, 5, 7, 3]],
    [RED_D1, [6, 2, 3, 7]],
  ]
);
