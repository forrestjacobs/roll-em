import { Cylinder } from "zdog";
import { LEN, RADIUS, RendererFactory, YELLOW0, YELLOW_D1 } from "./consts";

const DIAMETER = 1.8 * RADIUS;

const cylinder = new Cylinder({
  diameter: DIAMETER,
  length: LEN / 4,
  stroke: false,
  color: YELLOW_D1,
  backface: YELLOW0,
});

export const makeCylinder: RendererFactory = (x, y, z) => {
  const scene = cylinder.copyGraph();
  scene.rotate.y = y;
  scene.rotate.z = z;

  return (context, xRotation) => {
    scene.rotate.x = xRotation + x;
    scene.updateGraph();
    scene.renderGraphCanvas(context);
  };
};
