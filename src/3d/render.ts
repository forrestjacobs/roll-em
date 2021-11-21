import { PI } from "./scenes";
import type { DieRenderer } from "./scenes";

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
): [x: number, y: number, w: number, h: number] | undefined {
  context.save();
  context.scale(radius, radius);
  context.translate(1, 1 - rotation);
  const bounds = render(context, rotation);
  context.restore();

  if (bounds === undefined) {
    return undefined;
  }

  const [w, n, e, s] = bounds;
  const y = Math.max(0, Math.floor((n + 1 - rotation) * radius));
  const h = Math.ceil((s + 1 - rotation) * radius) - y;
  if (h <= 0) {
    return undefined;
  }

  const x = Math.floor((w + 1) * radius);
  return [x, y, Math.ceil((e + 1) * radius) - x, h];
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
