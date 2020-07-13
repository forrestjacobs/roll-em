import { Anchor, Hemisphere } from "zdog";
import { getColor, RADIUS, GREEN } from "./consts";

const DIAMETER = 1.8 * RADIUS;

export function makeSphere(): Anchor {
  const addTo = new Anchor();

  new Hemisphere({
    addTo,
    diameter: DIAMETER,
    stroke: false,
    color: getColor(GREEN, 0),
    backface: getColor(GREEN, -1),
  });

  new Hemisphere({
    addTo,
    rotate: {
      x: Math.PI,
    },
    diameter: DIAMETER,
    stroke: false,
    color: getColor(GREEN, -1),
    backface: getColor(GREEN, 0),
  });

  addTo.rotate.x = Math.PI / 4;

  return addTo;
}
