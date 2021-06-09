import { mocked } from "ts-jest/utils";
import { animate, render } from ".";
import { random, randomInt } from "../utils/rng";
import { renderCanvas, renderValue } from "./render";
import { getScene } from "./scenes";
import type { Bounds, DieRenderer } from "./scenes/consts";

jest.mock("../utils/rng");
jest.mock("./render");
jest.mock("./scenes");

beforeEach(() => {
  jest.resetAllMocks();
});

test("It skips rendering if 2d context is not available", () => {
  const canvas = {
    getContext: jest.fn<RenderingContext | null, [string]>(() => null),
  } as Partial<HTMLCanvasElement> as HTMLCanvasElement;

  render(6, 10, canvas);

  expect(getScene).not.toBeCalled();
  expect(renderCanvas).not.toBeCalled();
});

test("It can render a static scene", () => {
  const context = {
    clearRect: jest.fn(),
  } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D;
  const canvas = {
    getContext: jest.fn<RenderingContext | null, [string]>(() => context),
  } as Partial<HTMLCanvasElement> as HTMLCanvasElement;
  const dieRenderer = jest.fn<
    Bounds | undefined,
    [CanvasRenderingContext2D, number]
  >();
  const getSceneDieRenderer = jest.fn<DieRenderer, [number, number, number]>(
    () => dieRenderer
  );
  mocked(getScene).mockImplementation(() => ({
    faceRadius: 4,
    getDieRenderer: getSceneDieRenderer,
  }));
  mocked(random)
    .mockImplementationOnce(() => 0.3)
    .mockImplementationOnce(() => 0.6)
    .mockImplementationOnce(() => 0.9);

  render(6, 10, canvas);

  expect(getScene).toBeCalledWith(6);
  expect(getSceneDieRenderer).toBeCalled();
  expect(getSceneDieRenderer.mock.calls[0][0]).toBeCloseTo(Math.PI / -160);
  expect(getSceneDieRenderer.mock.calls[0][1]).toBeCloseTo(Math.PI / 320);
  expect(getSceneDieRenderer.mock.calls[0][2]).toBeCloseTo(Math.PI / 80);
  expect(renderCanvas).toBeCalledWith(dieRenderer, 10, context, 0);
});

test("It can animate a scene", () => {
  jest.useFakeTimers();

  const context = {
    clearRect: jest.fn(),
  } as Partial<CanvasRenderingContext2D> as CanvasRenderingContext2D;
  const canvas = {
    getContext: jest.fn<RenderingContext | null, [string]>(() => context),
  } as Partial<HTMLCanvasElement> as HTMLCanvasElement;
  const dieRenderer = jest.fn<
    Bounds | undefined,
    [CanvasRenderingContext2D, number]
  >();
  const getSceneDieRenderer = jest.fn<DieRenderer, [number, number, number]>(
    () => dieRenderer
  );
  mocked(getScene).mockImplementation(() => ({
    faceRadius: 4,
    getDieRenderer: getSceneDieRenderer,
  }));
  mocked(renderCanvas).mockImplementation((_, _2, _3, r) => [3, 0, 7, 2 - r]);
  mocked(random)
    .mockImplementationOnce(() => 0.3)
    .mockImplementationOnce(() => 0.6)
    .mockImplementationOnce(() => 0.9);
  mocked(randomInt).mockImplementationOnce(() => 0);
  const valueEl = document.createElement("div");

  animate(6, 10, canvas, 8, valueEl);

  expect(getScene).toBeCalledWith(6);
  expect(getSceneDieRenderer).toBeCalled();
  expect(getSceneDieRenderer.mock.calls[0][0]).toBeCloseTo(Math.PI / -160);
  expect(getSceneDieRenderer.mock.calls[0][1]).toBeCloseTo(Math.PI / 320);
  expect(getSceneDieRenderer.mock.calls[0][2]).toBeCloseTo(Math.PI / 80);
  expect(renderValue).toBeCalledWith(8, 4, valueEl, 2);

  const raf = jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementationOnce((iter) => {
      iter(100);
      return -1;
    })
    .mockImplementationOnce((iter) => {
      iter(400);
      return -1;
    })
    .mockImplementationOnce((iter) => {
      iter(700);
      return -1;
    });

  jest.runAllTimers();
  expect(requestAnimationFrame).toBeCalledTimes(3);

  expect(mocked(renderCanvas).mock.calls[0][3]).toBeCloseTo(2);
  expect(mocked(renderCanvas).mock.calls[1][3]).toBeCloseTo(0.128);
  expect(mocked(renderCanvas).mock.calls[2][3]).toBeCloseTo(0);
  expect(mocked(context.clearRect).mock.calls[0]).toEqual([3, 0, 7, 0]);
  expect(mocked(context.clearRect).mock.calls[1][3]).toBeCloseTo(1.872);
  expect(mocked(renderValue).mock.calls[1][3]).toBeCloseTo(2);
  expect(mocked(renderValue).mock.calls[2][3]).toBeCloseTo(0.128);
  expect(mocked(renderValue).mock.calls[3][3]).toBeCloseTo(0);

  raf.mockRestore();
});
