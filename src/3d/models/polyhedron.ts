import { Anchor, PathCommand, Shape, ShapeOptions, VectorOptions } from "zdog";

export function makeVert(x: number, y: number, z: number): VectorOptions {
  return { x, y, z };
}

export function makeFace(color: string, ...p: PathCommand[]): ShapeOptions {
  return { path: p, color };
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
