import { Illustration } from "zdog";
import { makeModel } from "./models";
import { RADIUS } from "./models/consts";
import { random } from "../utils/rng";

const ANIMATION_LENGTH_MS = 1_000;
const RAND_ROTATE_RANGE = Math.PI / 32;

function makeIllustration(
  sides: number,
  canvas: HTMLCanvasElement
): Illustration {
  const illustration = new Illustration({
    element: canvas,
  });

  const model = makeModel(sides);
  model.rotate.x = (random() - 0.5) * RAND_ROTATE_RANGE;
  model.rotate.y = (random() - 0.5) * RAND_ROTATE_RANGE;
  model.rotate.z = (random() - 0.5) * RAND_ROTATE_RANGE;

  illustration.addChild(model);
  return illustration;
}

function renderIllustration(
  illustration: Illustration,
  progress: number
): void {
  // ease out cubic -- see https://easings.net/#easeOutCubic
  const x = Math.pow(1 - progress, 3);
  illustration.translate.y = -2 * RADIUS * x;
  illustration.rotate.x = 2 * x;
  illustration.updateRenderGraph();
}

export function render(sides: number, canvas: HTMLCanvasElement): void {
  renderIllustration(makeIllustration(sides, canvas), 1);
}

export function animate(sides: number, canvas: HTMLCanvasElement): void {
  const illustration = makeIllustration(sides, canvas);

  const start = Date.now();
  function iter() {
    const progress = Math.min(1, (Date.now() - start) / ANIMATION_LENGTH_MS);
    renderIllustration(illustration, progress);
    if (progress != 1) {
      requestAnimationFrame(iter);
    }
  }
  iter();
}
