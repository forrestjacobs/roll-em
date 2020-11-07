import { Anchor, Shape, VectorOptions } from "zdog";
import type { RendererFactory } from "./consts";

export type Face = [color: string, vertIndexes: number[]];

export function makeVert(x: number, y: number, z: number): VectorOptions {
  return { x, y, z };
}

export function makeFace(color: string, ...i: number[]): Face {
  return [color, i];
}

export function makePolyhedron(
  verts: VectorOptions[],
  faces: Face[]
): RendererFactory {
  const polyhedron = new Anchor();

  for (const [color, vertIndexes] of faces) {
    new Shape({
      addTo: polyhedron,
      fill: true,
      stroke: false,
      color,
      path: vertIndexes.map((i) => verts[i]),
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
