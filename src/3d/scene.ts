import { random } from "../utils/rng";
import { getRenderer, PI, Renderer } from "./models";

export const RAND_ROTATE_RANGE = PI / 32;

function randAxis() {
  return (random() - 0.5) * RAND_ROTATE_RANGE;
}

export function makeRenderer(sides: number): Renderer {
  return getRenderer(sides, randAxis(), randAxis(), randAxis());
}
