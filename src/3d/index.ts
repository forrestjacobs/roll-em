import { Anchor, Illustration } from "zdog";
import { random } from "../utils/rng";
import { getLenth, makeModel } from "./models";
import { RADIUS } from "./models/consts";

const ANIMATION_LENGTH_MS = 1_000;
const { PI } = Math;
const RAND_ROTATE_RANGE = PI / 32;
const HIDDEN_TRANSFORMATION = "matrix(1, 0, 0, 0, 0, 0)";

function makeIllustration(
  sides: number,
  canvas: HTMLCanvasElement
): Illustration {
  const illustration = new Illustration({
    element: canvas,
  });

  const anchor = new Anchor();
  anchor.rotate.x = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.rotate.y = (random() - 0.5) * RAND_ROTATE_RANGE;
  anchor.rotate.z = (random() - 0.5) * RAND_ROTATE_RANGE;

  const model = makeModel(sides);
  anchor.addChild(model);

  illustration.addChild(anchor);
  return illustration;
}

function renderIllustration(
  sides: number,
  illustration: Illustration,
  valueEl: HTMLElement,
  progress: number
): void {
  // ease out cubic -- see https://easings.net/#easeOutCubic
  const rotation = 2 * Math.pow(1 - progress, 3);
  const translation = RADIUS * -rotation;

  illustration.translate.y = translation;
  illustration.rotate.x = rotation;
  illustration.updateRenderGraph();

  if (rotation > PI) {
    valueEl.style.transform = HIDDEN_TRANSFORMATION;
  } else {
    const valueYScale = Math.cos(rotation);
    const valueTranslation = translation - getLenth(sides) * Math.sin(rotation);
    valueEl.style.transform = `matrix(1, 0, 0, ${valueYScale}, 0, ${valueTranslation})`;
  }
}

export function render(
  sides: number,
  canvas: HTMLCanvasElement,
  valueEl: HTMLElement
): void {
  renderIllustration(sides, makeIllustration(sides, canvas), valueEl, 1);
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
    renderIllustration(sides, illustration, valueEl, progress);
    if (progress != 1) {
      requestAnimationFrame(iter);
    }
  }
  requestAnimationFrame(iter);
}
