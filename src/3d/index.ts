import { randomInt } from "../utils/rng";
import { makeScene } from "./scene";
import { render as innerRender } from "./render";
import { RADIUS } from "./models";

const MAX_INITIAL_PAUSE = 125;
const ANIMATION_LENGTH_MS = 500;

function setupCanvas(canvas: HTMLCanvasElement, scale: number) {
  canvas.width = 2 * scale * RADIUS;
  canvas.height = 2 * scale * RADIUS;
}

export function render(
  sides: number,
  scale: number,
  canvas: HTMLCanvasElement,
  valueEl: HTMLElement
): void {
  setupCanvas(canvas, scale);
  const scene = makeScene(sides);
  const context = canvas.getContext("2d");

  if (context !== null) {
    innerRender(sides, scene, scale, context, valueEl, 1);
  }
}

export function animate(
  sides: number,
  scale: number,
  canvas: HTMLCanvasElement,
  valueEl: HTMLElement
): void {
  setupCanvas(canvas, scale);
  const scene = makeScene(sides);
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  innerRender(sides, scene, scale, context, valueEl, 0);

  let start: number | undefined;
  const iter = (now: number) => {
    if (start === undefined) {
      start = now;
    }
    const progress = Math.min(1, (now - start) / ANIMATION_LENGTH_MS);
    innerRender(sides, scene, scale, context, valueEl, progress);
    if (progress != 1) {
      requestAnimationFrame(iter);
    }
  }

  setTimeout(() => requestAnimationFrame(iter), randomInt(MAX_INITIAL_PAUSE));
}
