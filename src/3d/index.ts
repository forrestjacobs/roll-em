import { random, randomInt } from "../utils/rng";
import { renderCanvas, renderValue } from "./render";
import { getScene, PI } from "./scenes";
import type { DieRenderer, Scene } from "./scenes/consts";

const MAX_INITIAL_PAUSE = 125;
const ANIMATION_LENGTH_MS = 350;

export const RAND_ROTATE_RANGE = PI / 32;

function randAxis() {
  return (random() - 0.5) * RAND_ROTATE_RANGE;
}

function makeRenderer(scene: Scene): DieRenderer {
  return scene.getDieRenderer(randAxis(), randAxis(), randAxis());
}

export function getColor(sides: number): string {
  return getScene(sides).color;
}

export function render(
  sides: number,
  radius: number,
  canvas: HTMLCanvasElement
): void {
  const context = canvas.getContext("2d");
  if (context !== null) {
    const scene = getScene(sides);
    renderCanvas(makeRenderer(scene), radius, context, 0);
  }
}

export function animate(
  sides: number,
  canvasRadius: number,
  canvas: HTMLCanvasElement,
  valueRadius: number,
  valueEl: HTMLElement
): void {
  const context = canvas.getContext("2d");
  if (context === null) {
    return;
  }

  const scene = getScene(sides);
  const renderer = makeRenderer(scene);
  const faceRadius = scene.faceRadius;
  renderValue(valueRadius, faceRadius, valueEl, 2);

  setTimeout(() => {
    let start: number | undefined = undefined;
    let bounds: [x: number, y: number, w: number, h: number] | undefined =
      undefined;
    const iter = (now: number) => {
      if (start === undefined) {
        start = now;
      }

      const progress = Math.min(1, (now - start) / ANIMATION_LENGTH_MS);

      // ease out cubic -- see https://easings.net/#easeOutCubic
      const invertedProgress = 1 - progress;
      const rotation =
        2 * invertedProgress * invertedProgress * invertedProgress;
      if (bounds !== undefined) {
        context.clearRect(...bounds);
      }
      bounds = renderCanvas(renderer, canvasRadius, context, rotation);
      renderValue(valueRadius, faceRadius, valueEl, rotation);
      if (progress != 1) {
        requestAnimationFrame(iter);
      }
    };
    requestAnimationFrame(iter);
  }, randomInt(MAX_INITIAL_PAUSE));
}
