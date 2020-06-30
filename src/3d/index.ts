import { Illustration } from "zdog";
import { makeModel } from "./models";
import { RADIUS, LEN } from "./models/consts";
import { random } from "../utils/rng";

const ANIMATION_LENGTH_MS = 1_000;
const RAND_ROTATE_RANGE = Math.PI / 32;
const HALF_PI = Math.PI;

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
  valueEl: HTMLElement,
  progress: number
): void {
  // ease out cubic -- see https://easings.net/#easeOutCubic
  const y = Math.pow(1 - progress, 3);

  const translation = -2 * RADIUS * y;
  const rotation = 2 * y;

  illustration.translate.y = translation;
  illustration.rotate.x = rotation;
  illustration.updateRenderGraph();

  if (rotation > HALF_PI) {
    valueEl.style.transform = `matrix(1, 0, 0, 0, 0, 0)`;
  } else {
    const valueYScale = Math.cos(rotation);
    const valueTranslation = translation - LEN * Math.sin(rotation);
    valueEl.style.transform = `matrix(1, 0, 0, ${valueYScale}, 0, ${valueTranslation})`;
  }
}

export function render(
  sides: number,
  canvas: HTMLCanvasElement,
  valueEl: HTMLElement
): void {
  renderIllustration(makeIllustration(sides, canvas), valueEl, 1);
}

export function animate(
  sides: number,
  canvas: HTMLCanvasElement,
  valueEl: HTMLElement
): void {
  const illustration = makeIllustration(sides, canvas);

  let start: number | undefined;
  function iter(now: number) {
    if (start === undefined) {
      start = now;
    }
    const progress = Math.min(1, (now - start) / ANIMATION_LENGTH_MS);
    renderIllustration(illustration, valueEl, progress);
    if (progress != 1) {
      requestAnimationFrame(iter);
    }
  }
  requestAnimationFrame(iter);
}
