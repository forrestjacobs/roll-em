import { BASE_FACE_RADIUS, GREEN0, GREEN_D1, PI } from "./consts";
import type { Bounds, Scene } from "./consts";

const RADIUS = 0.9;
const DEFAULT_X = PI / 4;

const BOUNDS: Bounds = [-RADIUS, -RADIUS, RADIUS, RADIUS];

function pathHemisphere(
  context: CanvasRenderingContext2D,
  radY: number,
  rotZ: number,
  start: number,
  end: number
) {
  context.beginPath();
  context.ellipse(0, 0, RADIUS, RADIUS, rotZ, start, end);
  if (radY > 0) {
    context.ellipse(0, 0, RADIUS, RADIUS * radY, rotZ, end, start);
  }
}

export const sphereScene: Scene = {
  faceRadius: BASE_FACE_RADIUS,
  getDieRenderer(x, y, z) {
    return (context, rotX) => {
      const radiusY = Math.cos(DEFAULT_X + x + rotX);
      context.fillStyle = GREEN_D1;
      pathHemisphere(context, 0.5, z, 0, PI);
      context.fill();

      context.fillStyle = GREEN0;
      pathHemisphere(context, Math.max(0, radiusY), z, PI, 0);
      context.fill();

      return BOUNDS;
    };
  },
};
