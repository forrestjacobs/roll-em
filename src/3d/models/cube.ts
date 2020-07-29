import { Box } from "zdog";
import { getColor, LEN, RED } from "./consts";

export const cube = new Box({
  width: LEN,
  height: LEN,
  depth: LEN,
  stroke: false,
  topFace: getColor(RED, 2),
  leftFace: getColor(RED, 1),
  rightFace: getColor(RED, 1),
  color: getColor(RED),
  bottomFace: getColor(RED, -1),
  rearFace: getColor(RED, -2),
});
