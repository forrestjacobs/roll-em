import { Illustration } from "zdog";
import { makeModel } from "./models";

export function renderDie(sides: number, canvas: HTMLCanvasElement): void {
  const illustration = new Illustration({
    element: canvas,
  });
  illustration.addChild(makeModel(sides));
}
