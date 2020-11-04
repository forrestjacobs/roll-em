import { Anchor, PathCommand, Shape, ShapeOptions, VectorOptions } from "zdog";
import type { RendererFactory } from "./consts";

export function makeVert(x: number, y: number, z: number): VectorOptions {
  return { x, y, z };
}

export function makeFace(color: string, ...p: PathCommand[]): ShapeOptions {
  return { path: p, color };
}

export function makePolyhedron(faces: ShapeOptions[]): RendererFactory {
  const polyhedron = new Anchor();

  for (const face of faces) {
    new Shape({
      addTo: polyhedron,
      fill: true,
      stroke: false,
      ...face,
    });
  }

  return (x, y, z) => {
    const scene = polyhedron.copyGraph();
    scene.rotate.y = y;
    scene.rotate.z = z;

    return (context, xRotation) => {
      scene.rotate.x = xRotation + x;
      scene.updateGraph();
      scene.renderGraphCanvas(context);
    };
  };
}
