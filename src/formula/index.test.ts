import { parse } from ".";
import { parse as pegParse } from "./parser.pegjs";
import type { Formula } from "./types";
import { validate } from "./validate";

jest.mock("./parser.pegjs");
jest.mock("./validate");

it("validates parsed input", () => {
  const formula: Formula = [];
  ((pegParse as unknown) as jest.MockedFunction<
    typeof pegParse
  >).mockImplementation(() => formula);
  ((validate as unknown) as jest.MockedFunction<
    typeof validate
  >).mockImplementation(() => {
    return;
  });
  expect(parse("test")).toBe(formula);
  expect(pegParse).toBeCalledWith("test");
  expect(validate).toBeCalledWith(formula);
});
