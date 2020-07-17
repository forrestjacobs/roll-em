import { id } from "./id";

let exclusiveMaxCallCount = 0;

jest.mock("./rng", () => ({
  randomInt: (exclusiveMax: number) => {
    exclusiveMaxCallCount++;
    return (5 * exclusiveMaxCallCount) % exclusiveMax;
  },
}));

test("It generates a random ID from randomInt", () => {
  expect(id()).toBe("FKPUZejoty38BGLQVafk");
});
