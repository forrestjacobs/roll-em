import type { Scene } from "./consts";
import { cubeScene } from "./cube";
import { cylinderScene } from "./cylinder";
import { decahedronScene } from "./decahedron";
import { dodecahedronScene } from "./dodecahedron";
import { icosahedronScene } from "./icosahedron";
import { octahedronScene } from "./octahedron";
import { sphereScene } from "./sphere";
import { tetrahedronScene } from "./tetrahedron";

export { PI } from "./consts";
export type { DieRenderer, Scene } from "./consts";

const scenes: { [sides: number]: Scene } = {
  2: cylinderScene,
  4: tetrahedronScene,
  6: cubeScene,
  8: octahedronScene,
  10: decahedronScene,
  12: dodecahedronScene,
  20: icosahedronScene,
};

export function getScene(sides: number): Scene {
  return scenes[sides] ?? sphereScene;
}
