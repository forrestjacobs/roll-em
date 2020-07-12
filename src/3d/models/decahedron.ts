import { Anchor } from "zdog";
import { makeFace, makePolyhedron, makeVert } from "./polyhedron";
import { RADIUS } from "./consts";

/**
 * Based off of http://www.georgehart.com/virtual-polyhedra/vrml/pentagonal_trapezohedron.wrl
 * which includes this statement:
 * (c) George W. Hart, 1997.  george@li.net
 * Dept. Computer Science, Hofstra University.
 * Freely distributable for noncommercial purposes.
 */

const v0 = makeVert(0.5257311, 0.381966, 0.8506508);
const v1 = makeVert(-0.2008114, 0.618034, 0.8506508);
const v2 = makeVert(-0.6498394, 0, 0.8506508);
const v3 = makeVert(0.5257311, -1.618034, 0.8506508);
const v4 = makeVert(1.051462, 0, -0.2008114);
const v5 = makeVert(0.8506508, 0.618034, 0.2008114);
const v6 = makeVert(-0.5257311, 1.618034, -0.8506508);
const v7 = makeVert(-1.051462, 0, 0.2008114);
const v8 = makeVert(-0.8506508, -0.618034, -0.2008114);
const v9 = makeVert(0.2008114, -0.618034, -0.8506508);
const v10 = makeVert(0.6498394, 0, -0.8506508);
const v11 = makeVert(-0.5257311, -0.381966, -0.8506508);

const faces = [
  makeFace(0, v3, v0, v1, v2),
  makeFace(2, v0, v3, v4, v5),
  makeFace(-1, v1, v0, v5, v6),
  makeFace(-2, v2, v1, v6, v7),
  makeFace(1, v3, v2, v7, v8),

  makeFace(-2, v4, v3, v9, v10),
  makeFace(-2, v5, v4, v10, v6),
  makeFace(-2, v7, v6, v11, v8),
  makeFace(-2, v3, v8, v11, v9),
  makeFace(-2, v10, v9, v11, v6),
];

export function makeDecahedron(): Anchor {
  const poly = makePolyhedron(faces);
  poly.rotate.x = Math.PI / 10;
  poly.rotate.z = -Math.PI / 10;

  const container = new Anchor();
  container.addChild(poly);
  container.scale.multiply({
    x: RADIUS * 0.9,
    y: RADIUS * 0.6,
    z: RADIUS,
  });
  container.rotate.x = -Math.PI / 10;
  return container;
}
