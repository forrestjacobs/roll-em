import { BASE_FACE_RADIUS, Scene } from "./consts";
import { rotateX, rotateY, rotateZ } from "./vert";

export type Face = [color: string, vertIndexes: number[]];

export function makeFace(color: string, ...i: number[]): Face {
  return [color, i];
}

export function makePolyhedronScene(
  pointBuffer: number[],
  faces: Face[]
): Scene {
  return {
    faceRadius: BASE_FACE_RADIUS,

    getDieRenderer(initRotX, initRotY, initRotZ) {
      const startingPointBuffer: number[] = pointBuffer.slice();
      rotateZ(startingPointBuffer, startingPointBuffer, initRotZ);
      rotateY(startingPointBuffer, startingPointBuffer, initRotY);
      rotateX(startingPointBuffer, startingPointBuffer, initRotX);

      const currentPointBuffer = startingPointBuffer.slice();
      const currentFaces = faces.slice();

      return (context, xRotation) => {
        rotateX(startingPointBuffer, currentPointBuffer, xRotation);

        function avgZ(face: Face): number {
          const pointIndexes = face[1];
          return (
            pointIndexes.reduce(
              (acc, index) => acc + currentPointBuffer[index * 3 + 2],
              0
            ) / pointIndexes.length
          );
        }

        currentFaces.sort((a, b) => {
          return avgZ(a) - avgZ(b);
        });

        for (const face of currentFaces) {
          const [color, pointIndexes] = face;
          const firstPointIndex = pointIndexes[0] * 3;

          context.fillStyle = color;
          context.beginPath();
          context.moveTo(
            currentPointBuffer[firstPointIndex],
            currentPointBuffer[firstPointIndex + 1]
          );
          for (let i = 1; i < pointIndexes.length; i++) {
            const pointIndex = pointIndexes[i] * 3;
            context.lineTo(
              currentPointBuffer[pointIndex],
              currentPointBuffer[pointIndex + 1]
            );
          }
          context.closePath();
          context.fill();
        }
      };
    },
  };
}
