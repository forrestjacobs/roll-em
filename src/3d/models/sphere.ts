import { GREEN0, GREEN_D1, PI, RADIUS, RendererFactory } from "./consts";

const CIRCLE_RAD = 0.9 * RADIUS;
const DEFAULT_X = PI / 4;

function pathHemisphere(
  context: CanvasRenderingContext2D,
  radY: number,
  rotZ: number,
  start: number,
  end: number
) {
  context.beginPath();
  context.ellipse(0, 0, CIRCLE_RAD, CIRCLE_RAD, rotZ, start, end);
  if (radY > 0) {
    context.ellipse(0, 0, CIRCLE_RAD, CIRCLE_RAD * radY, rotZ, end, start);
  }
}

export const makeSphere: RendererFactory = (x, y, z) => {
  return (context, rotX) => {
    const radiusY = Math.cos(DEFAULT_X + x + rotX);
    context.fillStyle = GREEN_D1;
    pathHemisphere(context, 0.5, z, 0, PI);
    context.fill();

    context.fillStyle = GREEN0;
    pathHemisphere(context, Math.max(0, radiusY), z, PI, 0);
    context.fill();
  };
};
