import { makeVert, makeFace } from "./polyhedron";

it("can make vertices", () => {
  expect(makeVert(1, 2, 3)).toStrictEqual({
    x: 1,
    y: 2,
    z: 3,
  });
});

it("can make faces", () => {
  expect(makeFace("gray", 1, 2, 3)).toStrictEqual(["gray", [1, 2, 3]]);
});
