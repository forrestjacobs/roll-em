import { getColor, Color } from "./consts";

const gray: Color = {
  r: 0x80,
  g: 0x80,
  b: 0x80,
};

it("can format color", () => {
  expect(getColor(gray)).toEqual("rgb(128 128 128)");
});

it("can brighten colors", () => {
  expect(getColor(gray, 1)).toEqual("rgb(175 175 144)");
  expect(getColor(gray, 2)).toEqual("rgb(223 223 185)");
});

it("can darken colors", () => {
  expect(getColor(gray, -1)).toEqual("rgb(80 80 111)");
  expect(getColor(gray, -2)).toEqual("rgb(32 32 70)");
});
