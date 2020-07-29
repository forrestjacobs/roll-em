import { makeVert, makeFace } from "./polyhedron";
import { getColor } from "./consts";

jest.mock("./consts");

it("can make vertices", () => {
  expect(makeVert(1, 2, 3)).toStrictEqual({
    x: 1,
    y: 2,
    z: 3,
  });
});

it("can make faces", () => {
  const color = { r: 0x80, g: 0x80, b: 0x80 };
  ((getColor as unknown) as jest.MockedFunction<
    typeof getColor
  >).mockReturnValue("gray");
  const p1 = { x: 0, y: 1, z: 0 };
  const p2 = { x: 1, y: 0, z: 0 };
  const p3 = { x: -1, y: 0, z: 0 };
  expect(makeFace(color, 1, p1, p2, p3)).toStrictEqual({
    path: [p1, p2, p3],
    color: "gray",
  });
  expect(getColor).toBeCalledWith(color, 1);
});
