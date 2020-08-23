import { randomInt } from "../utils/rng";
import { makeIllustration } from "./illustration";
import { render as innerRender } from "./render";

const MAX_INITIAL_PAUSE = 125;
const ANIMATION_LENGTH_MS = 500;

export function render(
  sides: number,
  illustrationEl: HTMLCanvasElement | SVGSVGElement,
  valueEl: HTMLElement
): void {
  innerRender(sides, makeIllustration(sides, illustrationEl), valueEl, 1);
}

export function animate(
  sides: number,
  illustrationEl: HTMLCanvasElement | SVGSVGElement,
  valueEl: HTMLElement
): void {
  const illustration = makeIllustration(sides, illustrationEl);
  innerRender(sides, illustration, valueEl, 0);

  let start: number | undefined;
  function iter(now: number) {
    if (start === undefined) {
      start = now;
    }
    const progress = Math.min(1, (now - start) / ANIMATION_LENGTH_MS);
    innerRender(sides, illustration, valueEl, progress);
    if (progress != 1) {
      requestAnimationFrame(iter);
    }
  }

  setTimeout(() => requestAnimationFrame(iter), randomInt(MAX_INITIAL_PAUSE));
}
