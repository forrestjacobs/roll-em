import { BASE_FACE_RADIUS, Scene } from "./consts";
import { rotateX, rotateY, rotateZ } from "./vert";

export type Face = [color: string, vertIndexes: number[]];

function getAvgDimension(
  pointBuffer: number[],
  vertIndexes: number[],
  offset: number
): number {
  let sum = 0;
  for (const vertIndex of vertIndexes) {
    sum += pointBuffer[vertIndex + offset];
  }
  return sum / vertIndexes.length;
}

function drawFace(
  context: CanvasRenderingContext2D,
  pointBuffer: number[],
  [color, pointIndexes]: Face
): void {
  const firstPointIndex = pointIndexes[0];

  context.fillStyle = color;
  context.beginPath();
  context.moveTo(
    pointBuffer[firstPointIndex],
    pointBuffer[firstPointIndex + 1]
  );
  for (let index = 1; index < pointIndexes.length; index++) {
    const pointIndex = pointIndexes[index];
    context.lineTo(pointBuffer[pointIndex], pointBuffer[pointIndex + 1]);
  }
  context.closePath();
  context.fill();
}

export function makeFace(color: string, ...i: number[]): Face {
  return [color, i];
}

export function makePolyhedronScene(
  pointBuffer: number[],
  faces: Face[]
): Scene {
  let nextPointIndex = pointBuffer.length - 1;
  const zIndexes: number[] = [];
  for (const face of faces) {
    const vertIndexes = face[1];
    for (let index = 0; index < vertIndexes.length; index++) {
      vertIndexes[index] *= 3;
    }

    pointBuffer.push(
      0,
      getAvgDimension(pointBuffer, vertIndexes, 1),
      getAvgDimension(pointBuffer, vertIndexes, 2)
    );
    nextPointIndex += 3;
    zIndexes.push(nextPointIndex);
  }

  return {
    faceRadius: BASE_FACE_RADIUS,

    getDieRenderer(initRotX, initRotY, initRotZ) {
      const startingPointBuffer: number[] = pointBuffer.slice();
      rotateZ(startingPointBuffer, startingPointBuffer, initRotZ);
      rotateY(startingPointBuffer, startingPointBuffer, initRotY);
      rotateX(startingPointBuffer, startingPointBuffer, initRotX);

      const currentPointBuffer = startingPointBuffer.slice();

      return (context, xRotation) => {
        rotateX(startingPointBuffer, currentPointBuffer, xRotation);

        for (let index = 0; index < faces.length; index++) {
          const z = currentPointBuffer[zIndexes[index]];
          if (z <= 0) {
            drawFace(context, currentPointBuffer, faces[index]);
          }
        }
        for (let index = 0; index < faces.length; index++) {
          const z = currentPointBuffer[zIndexes[index]];
          if (z > 0) {
            drawFace(context, currentPointBuffer, faces[index]);
          }
        }
      };
    },
  };
}
