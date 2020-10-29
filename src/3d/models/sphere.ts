import { Anchor, Hemisphere } from "zdog";
import { GREEN0, GREEN_D1, RADIUS } from "./consts";

const DIAMETER = 1.8 * RADIUS;

const addTo = new Anchor();

new Hemisphere({
  addTo,
  diameter: DIAMETER,
  stroke: false,
  color: GREEN0,
  backface: GREEN_D1,
});

new Hemisphere({
  addTo,
  rotate: {
    x: Math.PI,
  },
  diameter: DIAMETER,
  stroke: false,
  color: GREEN_D1,
  backface: GREEN0,
});

addTo.rotate.x = Math.PI / 4;

export const sphere = addTo;
