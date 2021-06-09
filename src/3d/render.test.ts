import { renderCanvas, renderValue } from "./render";
import type { Bounds } from "./scenes/consts";

test("it sets up the canvas for render", () => {
  const render = jest.fn((): Bounds => [-0.5, 0, 0.5, 1]);
  const context = {
    save: jest.fn(),
    scale: jest.fn(),
    translate: jest.fn(),
    restore: jest.fn(),
  } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D;
  const rotation = Math.PI / 2;

  const rect = renderCanvas(render, 22, context, rotation);
  expect(rect).toEqual([11, 0, 22, 10]);

  expect(context.save).toBeCalledWith();
  expect(context.scale).toBeCalledWith(22, 22);
  expect(context.translate).toBeCalledWith(1, 1 - rotation);
  expect(render).toBeCalledWith(context, rotation);
  expect(context.restore).toBeCalledWith();
});

test("it hides the value element before it crests", () => {
  const element = document.createElement("div");
  renderValue(22, Math.SQRT2 / 2, element, (2 * Math.PI) / 3);
  expect(element.style.visibility).toBe("hidden");
});

test("shows and rotates the value element after it crests", () => {
  const element = document.createElement("div");
  renderValue(22, Math.SQRT2 / 2, element, Math.PI / 3);
  expect(element.style.visibility).toBe("visible");
  expect(element.style.transform).toBe(
    "matrix(1, 0, 0, 0.50000, 0, -36.51054)"
  );
});
