import { BASE_FACE_RADIUS, PI, Scene, YELLOW0, YELLOW_D1 } from "./consts";
import { rotateX, rotateY, rotateZ } from "./vert";

const RADIUS = 0.9;
const FACE_RADIUS = BASE_FACE_RADIUS / 4;

export const cylinderScene: Scene = {
  faceRadius: FACE_RADIUS,
  getDieRenderer(x, y, z) {
    const startingPointBuffer = [0, 0, FACE_RADIUS, 0, 0, -FACE_RADIUS];
    rotateZ(startingPointBuffer, startingPointBuffer, z);
    rotateY(startingPointBuffer, startingPointBuffer, y);
    rotateX(startingPointBuffer, startingPointBuffer, x);

    const currentPointBuffer = startingPointBuffer.slice();

    return (context, xRotation) => {
      rotateX(startingPointBuffer, currentPointBuffer, xRotation);

      const radiusY = Math.cos(x + xRotation) * RADIUS;
      if (radiusY > 0) {
        const [x0, y0, , x1, y1] = currentPointBuffer;
        context.fillStyle = YELLOW_D1;
        context.beginPath();
        context.ellipse(x1, y1, RADIUS, radiusY, 0, 0, PI);
        context.ellipse(x1, y1, RADIUS, radiusY, 0, PI, 0);
        context.fill();

        context.strokeStyle = YELLOW_D1;
        context.lineWidth = 2 * RADIUS;

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x0, y0);
        context.stroke();

        context.fillStyle = YELLOW0;
        context.beginPath();
        context.ellipse(x0, y0, RADIUS, radiusY, 0, 0, PI);
        context.ellipse(x0, y0, RADIUS, radiusY, 0, PI, 0);
        context.fill();
      }
    };
  },
};
