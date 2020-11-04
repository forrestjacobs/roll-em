import { getLength, RADIUS, Renderer } from "./models";

function getFaceTransform(rx: number, ty: number, sides: number): string {
  const valueYScale = Math.cos(rx).toFixed(5);
  const valueTranslation = (ty - getLength(sides) * Math.sin(rx)).toFixed(5);
  return `matrix(1, 0, 0, ${valueYScale}, 0, ${valueTranslation})`;
}

export function render(
  sides: number,
  render: Renderer,
  scale: number,
  context: CanvasRenderingContext2D,
  faceEl: HTMLElement,
  progress: number
): void {
  // ease out cubic -- see https://easings.net/#easeOutCubic
  const rotation = 2 * Math.pow(1 - progress, 3);
  const translation = RADIUS * -rotation;

  context.clearRect(0, 0, RADIUS * 2 * scale, RADIUS * 2 * scale);

  context.save();
  context.scale(scale, scale);
  context.translate(RADIUS, RADIUS + translation);
  render(context, rotation);
  context.restore();

  faceEl.style.transform = getFaceTransform(rotation, translation, sides);
}
