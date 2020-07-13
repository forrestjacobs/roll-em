import { Anchor, PathCommand, Shape, ShapeOptions, VectorOptions } from "zdog";
import { Color, getColor } from "./consts";

export function makeVert(x: number, y: number, z: number): VectorOptions {
  return { x, y, z };
}

export function makeFace(
  base: Color,
  relColor: number,
  ...p: PathCommand[]
): ShapeOptions {
  return { path: p, color: getColor(base, relColor) };
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
