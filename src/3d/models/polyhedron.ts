import { Anchor, Shape, ShapeOptions, VectorOptions } from "zdog";
import { getColor } from "./consts";

export function makeVert(x: number, y: number, z: number): VectorOptions {
  return { x, y, z };
}

export function makeFace(
  v1: VectorOptions,
  v2: VectorOptions,
  v3: VectorOptions,
  relativeColorValue: number
): ShapeOptions {
  return { path: [v1, v2, v3], color: getColor(relativeColorValue) };
}

export function makePolyhedron(faces: ShapeOptions[]): Anchor {
  const addTo = new Anchor();

  for (const face of faces) {
    new Shape({
      addTo,
      fill: true,
      stroke: false,
      ...face,
    });
  }

  return addTo;
}
