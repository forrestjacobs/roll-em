import { Anchor, Hemisphere } from "zdog";
import { GREEN0, GREEN_D1, PI, RADIUS, RendererFactory } from "./consts";

const DIAMETER = 1.8 * RADIUS;

const sphere = new Anchor();

new Hemisphere({
  addTo: sphere,
  diameter: DIAMETER,
  stroke: false,
  color: GREEN0,
  backface: GREEN_D1,
});

new Hemisphere({
  addTo: sphere,
  rotate: {
    x: PI,
  },
  diameter: DIAMETER,
  stroke: false,
  color: GREEN_D1,
  backface: GREEN0,
});

const DEFAULT_X = PI / 4;

export const makeSphere: RendererFactory = (x, y, z) => {
  const scene = sphere.copyGraph();
  scene.rotate.y = y;
  scene.rotate.z = z;

  return (context, xRotation) => {
    scene.rotate.x = xRotation + x + DEFAULT_X;
    scene.updateGraph();
    scene.renderGraphCanvas(context);
  };
};
