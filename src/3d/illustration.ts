import { Anchor, Illustration } from "zdog";
import { random } from "../utils/rng";
import { makeModel } from "./models";

const { PI } = Math;
export const RAND_ROTATE_RANGE = PI / 32;

export function makeIllustration(
  sides: number,
  canvas: HTMLCanvasElement
): Illustration {
  const model = makeModel(sides);

  const anchor = new Anchor();
  anchor.rotate.x = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.rotate.y = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.rotate.z = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.addChild(model);

  const illustration = new Illustration({
    element: canvas,
  });
  illustration.addChild(anchor);

  return illustration;
}
