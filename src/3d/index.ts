import { Illustration } from "zdog";
import { makeModel } from "./models";
import { RADIUS } from "./models/consts";

const ANIMATION_LENGTH_MS = 1_000;

function makeIllustration(
  sides: number,
  canvas: HTMLCanvasElement
): Illustration {
  const illustration = new Illustration({
    element: canvas,
  });
  illustration.addChild(makeModel(sides));
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
