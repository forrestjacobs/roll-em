/*@__PURE__*/
export function random(): number {
  return Math.random();
}

/*@__PURE__*/
export function randomInt(exclusiveMax: number): number {
  return Math.floor(random() * exclusiveMax);
}
