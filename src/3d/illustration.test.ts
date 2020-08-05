import { Anchor } from "zdog";
import { random } from "../utils/rng";
import { makeModel } from "./models";
import { makeIllustration } from "./illustration";

jest.mock("../utils/rng");
jest.mock("./models");

declare module "zdog" {
  interface Anchor {
    children: Anchor[];
  }
}

function mockModel(model: Anchor) {
  ((makeModel as unknown) as jest.MockedFunction<
    typeof makeModel
  >).mockImplementation(() => model);
}

function mockRandom(...values: number[]) {
  for (const value of values) {
    ((random as unknown) as jest.MockedFunction<
      typeof random
    >).mockImplementationOnce(() => value);
  }
}

it("make an illustration containing the die's model", () => {
  const model = new Anchor();
  const canvas = document.createElement("canvas");

  mockModel(model);
  mockRandom(0, 0, 0);

  const illustration = makeIllustration(6, canvas);

  expect(makeModel).toBeCalledWith(6);

  expect(illustration.element).toBe(canvas);
  expect(illustration.children.length).toBe(1);
  expect(illustration.children[0].children).toStrictEqual([model]);
});

it("renders the die a little ajar", () => {
  mockModel(new Anchor());
  mockRandom(0.3, 0.6, 0.9);

  const illustration = makeIllustration(6, document.createElement("canvas"));

  const anchor = illustration.children[0];

  expect(anchor.rotate.x).toBeCloseTo((-0.2 * Math.PI) / 32);
  expect(anchor.rotate.y).toBeCloseTo((0.1 * Math.PI) / 32);
  expect(anchor.rotate.z).toBeCloseTo((0.4 * Math.PI) / 32);
});
