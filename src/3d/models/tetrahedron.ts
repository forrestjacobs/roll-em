import { Anchor, Shape } from "zdog";
import { getColor, RADIUS } from "./consts";

/**
 * Based off of https://github.com/mrdoob/three.js/blob/dev/src/geometries/TetrahedronGeometry.js
 * which is licensed under the MIT License.
 */

const l = RADIUS / Math.sqrt(3);

const v0 = { x: l, y: l, z: l };
const v1 = { x: -l, y: -l, z: l };
const v2 = { x: -l, y: l, z: -l };
const v3 = { x: l, y: -l, z: -l };

const faces = [
  {path: [v0, v3, v2], colorIndex: -1},
  {path: [v2, v1, v0], colorIndex: 0},
  {path: [v1, v3, v0], colorIndex: 1},
];

export function makeTetrahedron(): Anchor {
  const addTo = new Anchor({
    rotate: {
      x: Math.PI/3,
      z: Math.PI/4
    },
    translate: {
      y: RADIUS / 8
    }
  });

  for (const { path, colorIndex} of faces) {
    new Shape({
      addTo,
      path,
      fill: true,
      color: getColor(colorIndex),
    });
  }

  return addTo;
}
