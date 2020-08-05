import type { Illustration } from "zdog";
import { getLength, RADIUS } from "./models";

function updateIllustration(rx: number, ty: number, ill: Illustration): void {
  ill.translate.y = ty;
  ill.rotate.x = rx;
  ill.updateRenderGraph();
}

function getFaceTransform(rx: number, ty: number, sides: number): string {
  const valueYScale = Math.cos(rx).toFixed(5);
  const valueTranslation = (ty - getLength(sides) * Math.sin(rx)).toFixed(5);
  return `matrix(1, 0, 0, ${valueYScale}, 0, ${valueTranslation})`;
}

export function render(
  sides: number,
  illustration: Illustration,
  faceEl: HTMLElement,
  progress: number
): void {
  // ease out cubic -- see https://easings.net/#easeOutCubic
  const rotation = 2 * Math.pow(1 - progress, 3);
  const translation = RADIUS * -rotation;

  updateIllustration(rotation, translation, illustration);
  faceEl.style.transform = getFaceTransform(rotation, translation, sides);
}
