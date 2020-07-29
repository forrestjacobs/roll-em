import { makeModel, getLength } from ".";
import { makeCube } from "./cube";
import { makeSphere } from "./sphere";
import { Anchor } from "zdog";

jest.mock("./cube");
jest.mock("./sphere");

it("can make a model", () => {
  const anchor = new Anchor();
  ((makeCube as unknown) as jest.MockedFunction<
    typeof makeCube
  >).mockReturnValue(anchor);
  expect(makeModel(6)).toBe(anchor);
});

it("creates a sphere if the model isn't available", () => {
  const anchor = new Anchor();
  ((makeSphere as unknown) as jest.MockedFunction<
    typeof makeSphere
  >).mockReturnValue(anchor);
  expect(makeModel(30)).toBe(anchor);
});

it("can get the basic model length", () => {
  expect(getLength(6)).toBe(22 * Math.SQRT2);
});

it("can get the 2-sided model length", () => {
  expect(getLength(2)).toBe(5.5 * Math.SQRT2);
});
