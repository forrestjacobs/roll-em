import { DieRenderer, PI } from "./scenes";

const VISIBLE_THRESHOLD = PI / 2;

/*@__PURE__*/
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

function setVisibility(element: HTMLElement, value: string): void {
  if (element.style.visibility !== value) {
    element.style.visibility = value;
  }
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
  if (rotation < VISIBLE_THRESHOLD) {
    setVisibility(element, "visible");
    element.style.transform = getFaceTransform(radius, faceRadius, rotation);
  } else {
    setVisibility(element, "hidden");
  }
}
