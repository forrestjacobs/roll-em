import { Anchor } from "zdog";
import { random } from "../utils/rng";
import { makeModel, PI } from "./models";

export const RAND_ROTATE_RANGE = PI / 32;

export function makeScene(sides: number): Anchor {
  const model = makeModel(sides);

  const anchor = new Anchor();
  anchor.rotate.x = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.rotate.y = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.rotate.z = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.addChild(model);

  const wrapper = new Anchor();
  wrapper.addChild(anchor);

  return wrapper;
}
