export const BASE_FACE_RADIUS = Math.SQRT2 / 2;
export const PI = Math.PI;

export interface Scene {
  color: string;
  faceRadius: number;
  getDieRenderer(x: number, y: number, z: number): DieRenderer;
}

export type Bounds = [w: number, n: number, e: number, s: number];

export type DieRenderer = (
  context: CanvasRenderingContext2D,
  xRotation: number
) => Bounds | undefined;

export const YELLOW_B2 = "#ECE199";
export const YELLOW_B1 = "#D0B52C";
export const YELLOW0 = "#B58900";
export const YELLOW_D1 = "#71550B";
export const YELLOW_D2 = "#2D2226";

export const ORANGE_B2 = "#F2D29E";
export const ORANGE_B1 = "#DE8E3D";
export const ORANGE0 = "#CB4B16";
export const ORANGE_D1 = "#7E2E1C";
export const ORANGE_D2 = "#32122B";

export const RED_B2 = "#F6CBA4";
export const RED_B1 = "#E97E51";
export const RED0 = "#DC322F";
export const RED_D1 = "#891F2F";
export const RED_D2 = "#370C32";

export const MAGENTA_B2 = "#F4CCB9";
export const MAGENTA_B1 = "#E38192";
export const MAGENTA0 = "#D33682";
export const MAGENTA_D1 = "#832170";
export const MAGENTA_D2 = "#340D46";

export const VIOLET_B2 = "#DADBCA";
export const VIOLET_B1 = "#A3A6C5";
export const VIOLET0 = "#6C71C4";
export const VIOLET_D1 = "#4346A4";
export const VIOLET_D2 = "#1B1C57";

export const BLUE_B2 = "#C8E2CD";
export const BLUE_B1 = "#77B6D0";
export const BLUE0 = "#268BD2";
export const BLUE_D1 = "#1756AF";
export const BLUE_D2 = "#09225A";

export const CYAN_B2 = "#C9E7BF";
export const CYAN_B1 = "#79C4A3";
export const CYAN0 = "#2AA198";
export const CYAN_D1 = "#1A6481";
export const CYAN_D2 = "#0A284C";

export const GREEN_B2 = "#E0E599";
export const GREEN_B1 = "#B2BF2C";
export const GREEN0 = "#859900";
export const GREEN_D1 = "#535F0B";
export const GREEN_D2 = "#212626";
