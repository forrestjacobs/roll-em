import { Anchor, Hemisphere } from "zdog";
import { getColor, RADIUS } from "./consts";

const DIAMETER = 1.8 * RADIUS;

export function makeSphere(): Anchor {
  const addTo = new Anchor();

  new Hemisphere({
    addTo,
    diameter: DIAMETER,
    stroke: false,
    color: getColor(0),
    backface: getColor(-1),
  });

  new Hemisphere({
    addTo,
    rotate: {
      x: Math.PI,
    },
    diameter: DIAMETER,
    stroke: false,
    color: getColor(-1),
    backface: getColor(0),
  });

  addTo.rotate.x = Math.PI / 4;

  return addTo;
}
