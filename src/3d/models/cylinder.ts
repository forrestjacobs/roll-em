import { Anchor, Cylinder } from "zdog";
import { getColor, LEN, RADIUS } from "./consts";

const DIAMETER = 1.8 * RADIUS;

export function makeCylinder(): Anchor {
  return new Cylinder({
    diameter: DIAMETER,
    length: LEN / 4,
    stroke: false,
    color: getColor(-1),
    backface: getColor(0),
  });
}
