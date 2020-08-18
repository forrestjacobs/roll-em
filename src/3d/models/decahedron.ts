import { Anchor, VectorOptions } from "zdog";
import { RADIUS, VIOLET } from "./consts";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";

const y0 = makeVert(0, -1, 0);
const y1 = makeVert(0, 1, 0);

const ANTIPRISM_HEIGHT = 4 / Math.sqrt(5) - 2;

function makeAntiprismVert(i: number): VectorOptions {
  const rad = (i * Math.PI) / 5;
  return makeVert(
    Math.sin(rad),
    ((i % 2) - 0.5) * ANTIPRISM_HEIGHT,
    Math.cos(rad)
  );
}

const v0 = makeAntiprismVert(0);
const v1 = makeAntiprismVert(1);
const v2 = makeAntiprismVert(2);
const v3 = makeAntiprismVert(3);
const v4 = makeAntiprismVert(4);
const v5 = makeAntiprismVert(5);
const v6 = makeAntiprismVert(6);
const v7 = makeAntiprismVert(7);
const v8 = makeAntiprismVert(8);
const v9 = makeAntiprismVert(9);

const faces = [
  makeFace(VIOLET, -1, y0, v7, v8, v9),
  makeFace(VIOLET, -2, y1, v8, v9, v0),
  makeFace(VIOLET, 0, y0, v9, v0, v1),
  makeFace(VIOLET, -1, y1, v0, v1, v2),
  makeFace(VIOLET, 1, y0, v1, v2, v3),

  makeFace(VIOLET, -2, y1, v2, v3, v4),
  // makeFace(VIOLET, -2, y0, v3, v4, v5),
  makeFace(VIOLET, -2, y1, v4, v5, v6),
  // makeFace(VIOLET, -2, y0, v5, v6, v7),
  makeFace(VIOLET, -2, y1, v6, v7, v8),
];

const poly = makePolyhedron(faces);
poly.rotate.x = (Math.PI * -2) / 15;

const container = new Anchor();
container.addChild(poly);
container.scale.multiply({
  x: RADIUS * 0.9,
  y: RADIUS,
  z: RADIUS,
});

export const decahedron = container;
