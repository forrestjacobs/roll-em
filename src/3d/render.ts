import type { DieRenderer } from "./scenes";

function getFaceTransform(
  radius: number,
  faceRadius: number,
  rotation: number
): string {
  const valueYScale = Math.cos(rotation).toFixed(5);
  const valueTranslation = -(
    radius *
    (rotation + faceRadius * Math.sin(rotation))
  ).toFixed(5);
  return `matrix(1, 0, 0, ${valueYScale}, 0, ${valueTranslation})`;
}

export function renderCanvas(
  render: DieRenderer,
  radius: number,
  context: CanvasRenderingContext2D,
  rotation: number
): void {
  context.clearRect(0, 0, radius * 2, radius * 2);
  context.save();
  context.scale(radius, radius);
  context.translate(1, 1 - rotation);
  render(context, rotation);
  context.restore();
}

export function renderValue(
  radius: number,
  faceRadius: number,
  element: HTMLElement,
  rotation: number
): void {
  element.style.transform = getFaceTransform(radius, faceRadius, rotation);
}
