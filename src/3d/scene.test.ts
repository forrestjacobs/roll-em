import { Anchor } from "zdog";
import { random } from "../utils/rng";
import { makeModel } from "./models";
import { makeScene } from "./scene";

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

it("make a scene containing the die's model", () => {
  const model = new Anchor();

  mockModel(model);
  mockRandom(0, 0, 0);

  const scene = makeScene(6);

  expect(makeModel).toBeCalledWith(6);

  expect(scene.children.length).toBe(1);
  expect(scene.children[0].children).toStrictEqual([model]);
});

it("renders the die a little ajar", () => {
  mockModel(new Anchor());
  mockRandom(0.3, 0.6, 0.9);

  const scene = makeScene(6);

  const anchor = scene.children[0];

  expect(anchor.rotate.x).toBeCloseTo((-0.2 * Math.PI) / 32);
  expect(anchor.rotate.y).toBeCloseTo((0.1 * Math.PI) / 32);
  expect(anchor.rotate.z).toBeCloseTo((0.4 * Math.PI) / 32);
});
