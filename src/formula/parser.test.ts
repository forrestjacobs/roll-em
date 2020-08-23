import parser from "./parser.pegjs";

test("It throws on an empty string", () => {
  expect(() => parser.parse("")).toThrow();
});

test("It can parse a number", () => {
  expect(parser.parse("5")).toStrictEqual([{ type: "number", value: 5 }]);
});

test("It can parse a basic dice formula", () => {
  expect(parser.parse("2d4")).toStrictEqual([
    { type: "roll", count: 2, sides: 4 },
  ]);
});

test("It ignores case", () => {
  expect(parser.parse("2D4")).toStrictEqual([
    { type: "roll", count: 2, sides: 4 },
  ]);
});

test("It can parse a formula with count omitted", () => {
  expect(parser.parse("d4")).toStrictEqual([
    { type: "roll", count: 1, sides: 4 },
  ]);
});

test("It interprets percent sign as 100-sided", () => {
  expect(parser.parse("d%")).toStrictEqual([
    { type: "roll", count: 1, sides: 100 },
  ]);
});

test("It can parse multiple terms", () => {
  expect(parser.parse("2d4 + 5")).toStrictEqual([
    { type: "roll", count: 2, sides: 4 },
    { type: "number", value: 5 },
  ]);
});

test("It can parse subtracted terms", () => {
  expect(parser.parse("2d4 - 5")).toStrictEqual([
    { type: "roll", count: 2, sides: 4 },
    { type: "number", value: -5 },
  ]);
});

test("It can parse weird whitespace", () => {
  expect(parser.parse("\t2 d 4+5\t")).toStrictEqual([
    { type: "roll", count: 2, sides: 4 },
    { type: "number", value: 5 },
  ]);
});

test("It throws when sides not specified", () => {
  expect(() => parser.parse("2d")).toThrow();
  expect(() => parser.parse("d")).toThrow();
});

test("It throws on dice subtraction", () => {
  expect(() => parser.parse("- 2d4")).toThrow();
  expect(() => parser.parse("5 - 2d4")).toThrow();
});

test("It throws when right hand not specified", () => {
  expect(() => parser.parse("2d4 +")).toThrow();
});

test("It throws when left hand not specified", () => {
  expect(() => parser.parse("+")).toThrow();
});

test("It throws when negative value not specified", () => {
  expect(() => parser.parse("-")).toThrow();
});

test("It throws on junk input", () => {
  expect(() => parser.parse("lorem")).toThrow();
});
