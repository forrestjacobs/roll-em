import { renderCanvas, renderValue } from "./render";

test("it sets up the canvas for render", () => {
  const render = jest.fn();
  const context = ({
    clearRect: jest.fn(),
    save: jest.fn(),
    scale: jest.fn(),
    translate: jest.fn(),
    restore: jest.fn(),
  } as unknown) as CanvasRenderingContext2D;
  const rotation = Math.PI / 2;
  renderCanvas(render, 22, context, rotation);

  expect(context.clearRect).toBeCalledWith(0, 0, 44, 44);
  expect(context.save).toBeCalledWith();
  expect(context.scale).toBeCalledWith(22, 22);
  expect(context.translate).toBeCalledWith(1, 1 - rotation);
  expect(render).toBeCalledWith(context, rotation);
  expect(context.restore).toBeCalledWith();
});

test("it hides the value element before it crests", () => {
  const element = ({
    style: {},
  } as unknown) as HTMLElement;
  renderValue(22, Math.SQRT2 / 2, element, (2 * Math.PI) / 3);
  expect(element.style.visibility).toBe("hidden");
});

test("shows and rotates the value element after it crests", () => {
  const element = ({
    style: {},
  } as unknown) as HTMLElement;
  renderValue(22, Math.SQRT2 / 2, element, Math.PI / 3);
  expect(element.style.visibility).toBe("visible");
  expect(element.style.transform).toBe(
    "matrix(1, 0, 0, 0.50000, 0, -36.51054)"
  );
});
