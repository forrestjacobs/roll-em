import { Anchor, Box } from "zdog";
import { getColor, LEN } from "./consts";

export function makeCube(): Anchor {
  return new Box({
    width: LEN,
    height: LEN,
    depth: LEN,
    stroke: false,
    topFace: getColor(2),
    leftFace: getColor(1),
    rightFace: getColor(1),
    color: getColor(),
    bottomFace: getColor(-1),
    rearFace: getColor(-2),
  });
}
