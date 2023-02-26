import { parse } from ".";
import { parse as pegParse } from "./parser.pegjs";
import type { Formula } from "./types";
import { validate } from "./validate";

jest.mock("./parser.pegjs");
jest.mock("./validate");

it("validates parsed input", () => {
  const formula: Formula = [];
  jest.mocked(pegParse).mockImplementation(() => formula);
  jest.mocked(validate).mockImplementation(() => undefined);
  expect(parse("test")).toBe(formula);
  expect(pegParse).toBeCalledWith("test");
  expect(validate).toBeCalledWith(formula);
});
