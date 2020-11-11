import { LEN, PI, RADIUS, RendererFactory, YELLOW0, YELLOW_D1 } from "./consts";
import { rotateX, rotateY, rotateZ } from "./vert";

const CIRCLE_RAD = 0.9 * RADIUS;

export const makeCylinder: RendererFactory = (x, y, z) => {
  const startingPointBuffer = [0, 0, LEN / 8, 0, 0, -LEN / 8];
  rotateZ(startingPointBuffer, startingPointBuffer, z);
  rotateY(startingPointBuffer, startingPointBuffer, y);
  rotateX(startingPointBuffer, startingPointBuffer, x);

  const currentPointBuffer = startingPointBuffer.slice();

  return (context, xRotation) => {
    const radiusY = Math.cos(x + xRotation);
    rotateX(startingPointBuffer, currentPointBuffer, xRotation);

    if (radiusY > 0) {
      const [x0, y0, , x1, y1] = currentPointBuffer;
      context.fillStyle = YELLOW_D1;
      context.beginPath();
      context.ellipse(x1, y1, CIRCLE_RAD, radiusY * CIRCLE_RAD, 0, 0, PI);
      context.ellipse(x1, y1, CIRCLE_RAD, radiusY * CIRCLE_RAD, 0, PI, 0);
      context.fill();

      context.strokeStyle = YELLOW_D1;
      context.lineWidth = 2 * CIRCLE_RAD;

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x0, y0);
      context.stroke();

      context.fillStyle = YELLOW0;
      context.beginPath();
      context.ellipse(x0, y0, CIRCLE_RAD, radiusY * CIRCLE_RAD, 0, 0, PI);
      context.ellipse(x0, y0, CIRCLE_RAD, radiusY * CIRCLE_RAD, 0, PI, 0);
      context.fill();
    }
  };
};
