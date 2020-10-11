import { render, animate } from ".";
import { makeIllustration } from "./illustration";
import { render as innerRender } from "./render";
import { Illustration } from "zdog";

jest.mock("../utils/rng", () => ({
  randomInt: (max: number) => Math.floor(max / 2),
}));
jest.mock("./illustration");
jest.mock("./render");

it("can render a static die", () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const valueEl = document.createElement("span");
  const illustration = new Illustration({
    element: svg,
  });

  ((makeIllustration as unknown) as jest.MockedFunction<
    typeof makeIllustration
  >).mockImplementation(() => illustration);

  render(6, svg, valueEl);

  expect(makeIllustration).toBeCalledWith(6, svg);
  expect(innerRender).toBeCalledWith(6, illustration, valueEl, 1);
});

it("can animate a die", () => {
  jest.useFakeTimers("modern");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const valueEl = document.createElement("span");
  const illustration = new Illustration({
    element: svg,
  });

  ((makeIllustration as unknown) as jest.MockedFunction<
    typeof makeIllustration
  >).mockImplementation(() => illustration);

  animate(6, svg, valueEl);

  expect(makeIllustration).toBeCalledWith(6, svg);
  expect(innerRender).toBeCalledWith(6, illustration, valueEl, 0);

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
  expect(innerRender).toBeCalledWith(6, illustration, valueEl, 0);
  expect(raf).toBeCalledTimes(2);

  iter!(750);
  expect(innerRender).toBeCalledWith(6, illustration, valueEl, 0.5);
  expect(raf).toBeCalledTimes(3);

  iter!(1125);
  expect(innerRender).toBeCalledWith(6, illustration, valueEl, 1);
  expect(raf).toBeCalledTimes(3);
});
