import { makeModel, getLength } from ".";

jest.mock("./cube", () => ({
  cube: {
    copyGraph: () => "cube",
  },
}));
jest.mock("./sphere", () => ({
  sphere: {
    copyGraph: () => "sphere",
  },
}));

it("can make a model", () => {
  expect(makeModel(6)).toBe("cube");
});

it("creates a sphere if the model isn't available", () => {
  expect(makeModel(30)).toBe("sphere");
});

it("can get the basic model length", () => {
  expect(getLength(6)).toBeCloseTo(22 * Math.SQRT2);
});

it("can get the 2-sided model length", () => {
  expect(getLength(2)).toBeCloseTo(5.5 * Math.SQRT2);
});
