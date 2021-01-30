import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import { animate, render as renderDie } from "../3d";
import DieRoll from "./DieRoll.svelte";

jest.mock("../3d");

test("it can render a die", () => {
  globalThis.devicePixelRatio = 1.5;

  const result = render(DieRoll, {
    sides: 12,
    value: 7,
    animated: false,
  });

  expect(renderDie).toBeCalledWith(12, 33, expect.any(HTMLCanvasElement));

  expect(result.container).toHaveTextContent("7");
  expect(result.getByTitle("d12")).toBeInTheDocument();
});

test("it can render an unscaled die", () => {
  globalThis.devicePixelRatio = (undefined as unknown) as number;
  
  render(DieRoll, {
    sides: 12,
    value: 7,
    animated: false,
  });

  expect(renderDie).toBeCalledWith(12, 22, expect.any(HTMLCanvasElement));
});

test("it can animate a die", () => {
  globalThis.devicePixelRatio = 1.5;

  const result = render(DieRoll, {
    sides: 12,
    value: 7,
    animated: true,
  });

  expect(animate).toBeCalledWith(
    12,
    33,
    expect.any(HTMLCanvasElement),
    22,
    expect.any(HTMLElement)
  );

  expect(result.container).toHaveTextContent("7");
  expect(result.getByTitle("d12")).toBeInTheDocument();
});
