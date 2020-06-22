export function random(): number {
  return Math.random();
}

export function randomInt(exclusiveMax: number): number {
  return Math.floor(random() * exclusiveMax);
}
