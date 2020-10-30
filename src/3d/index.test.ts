import { render, animate } from ".";
import { makeScene } from "./scene";
import { render as innerRender } from "./render";
import { Anchor } from "zdog";

jest.mock("../utils/rng", () => ({
  randomInt: (max: number) => Math.floor(max / 2),
}));
jest.mock("./scene");
jest.mock("./render");

function makeMockCanvas(): HTMLCanvasElement {
  const context = {};

  return ({
    getContext: () => context,
  } as unknown) as HTMLCanvasElement;
}

it("can render a static die", () => {
  const canvas = makeMockCanvas();
  const valueEl = document.createElement("span");

  const scene = new Anchor();
  ((makeScene as unknown) as jest.MockedFunction<
    typeof makeScene
  >).mockImplementation(() => scene);

  render(6, 1, canvas, valueEl);

  expect(makeScene).toBeCalledWith(6);
  expect(innerRender).toBeCalledWith(
    6,
    scene,
    1,
    canvas.getContext("2d"),
    valueEl,
    1
  );
});

it("can animate a die", () => {
  jest.useFakeTimers("modern");

  const canvas = makeMockCanvas();
  const valueEl = document.createElement("span");

  const scene = new Anchor();
  ((makeScene as unknown) as jest.MockedFunction<
    typeof makeScene
  >).mockImplementation(() => scene);

  animate(6, 1, canvas, valueEl);

  expect(makeScene).toBeCalledWith(6);
  expect(innerRender).toBeCalledWith(
    6,
    scene,
    1,
    canvas.getContext("2d"),
    valueEl,
    0
  );

  jest.advanceTimersByTime(61);

  let iter: undefined | ((now: number) => number) = undefined;
  const raf = jest.fn((cb) => {
    iter = cb;
    return 0;
  });
  window.requestAnimationFrame = raf;

  jest.advanceTimersByTime(62);
  expect(raf).toBeCalledTimes(1);

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  iter!(500);
  expect(innerRender).toBeCalledWith(
    6,
    scene,
    1,
    canvas.getContext("2d"),
    valueEl,
    0
  );
  expect(raf).toBeCalledTimes(2);

  iter!(750);
  expect(innerRender).toBeCalledWith(
    6,
    scene,
    1,
    canvas.getContext("2d"),
    valueEl,
    0.5
  );
  expect(raf).toBeCalledTimes(3);

  iter!(1125);
  expect(innerRender).toBeCalledWith(
    6,
    scene,
    1,
    canvas.getContext("2d"),
    valueEl,
    1
  );
  expect(raf).toBeCalledTimes(3);
});
