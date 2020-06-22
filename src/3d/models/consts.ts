export const RADIUS = 22;

const colors = ["#636", "#C25", "#E62", "#EA0", "#ED0"];

export function getColor(relativeValue = 0): string {
  return colors[relativeValue + 2];
}
