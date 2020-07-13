export const RADIUS = 22;
export const LEN = RADIUS * Math.SQRT2;

// Colors from Solarized: https://ethanschoonover.com/solarized/
export const YELLOW = { r: 0xb5, g: 0x89, b: 0x00 };
export const ORANGE = { r: 0xcb, g: 0x4b, b: 0x16 };
export const RED = { r: 0xdc, g: 0x32, b: 0x2f };
export const MAGENTA = { r: 0xd3, g: 0x36, b: 0x82 };
export const VIOLET = { r: 0x6c, g: 0x71, b: 0xc4 };
export const BLUE = { r: 0x26, g: 0x8b, b: 0xd2 };
export const CYAN = { r: 0x2a, g: 0xa1, b: 0x98 };
export const GREEN = { r: 0x85, g: 0x99, b: 0x00 };

export interface Color {
  r: number;
  g: number;
  b: number;
}

const dark = { r: 0, g: 0, b: 0x33 };
const bright = { r: 0xff, g: 0xff, b: 0xcc };

function mixChannel(
  lhs: Color,
  rhs: Color,
  channel: keyof Color,
  mix: number
): number {
  return Math.floor(lhs[channel] * mix + rhs[channel] * (1 - mix));
}

function mixColors(
  lhs: Color,
  rhs: Color,
  mix: number,
  rPower: number,
  gPower: number,
  bPower: number
): string {
  const r = mixChannel(lhs, rhs, "r", 0.75 - Math.pow(1 - mix, rPower) * 0.75);
  const g = mixChannel(lhs, rhs, "g", 0.75 - Math.pow(1 - mix, gPower) * 0.75);
  const b = mixChannel(lhs, rhs, "b", 0.75 - Math.pow(1 - mix, bPower) * 0.75);
  return `rgb(${r} ${g} ${b})`;
}

export function getColor(base: Color, relativeValue = 0): string {
  return relativeValue > 0
    ? mixColors(bright, base, relativeValue / 2, 1, 1, 0.5)
    : mixColors(dark, base, relativeValue / -2, 1, 1, 0.5);
}
