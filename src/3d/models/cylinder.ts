import { Cylinder } from "zdog";
import { LEN, RADIUS, YELLOW0, YELLOW_D1 } from "./consts";

const DIAMETER = 1.8 * RADIUS;

export const cylinder = new Cylinder({
  diameter: DIAMETER,
  length: LEN / 4,
  stroke: false,
  color: YELLOW_D1,
  backface: YELLOW0,
});
