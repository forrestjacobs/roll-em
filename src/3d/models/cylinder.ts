import { Cylinder } from "zdog";
import { getColor, LEN, RADIUS, YELLOW } from "./consts";

const DIAMETER = 1.8 * RADIUS;

export const cylinder = new Cylinder({
  diameter: DIAMETER,
  length: LEN / 4,
  stroke: false,
  color: getColor(YELLOW, -1),
  backface: getColor(YELLOW, 0),
});
