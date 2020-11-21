import { makeFace } from "./polyhedron";

it("can make faces", () => {
  expect(makeFace("gray", 1, 2, 3)).toStrictEqual(["gray", [1, 2, 3]]);
});
