import { mocked } from "ts-jest/utils";
import { parse } from ".";
import { parse as pegParse } from "./parser.pegjs";
import type { Formula } from "./types";
import { validate } from "./validate";

jest.mock("./parser.pegjs");
jest.mock("./validate");

it("validates parsed input", () => {
  const formula: Formula = [];
  mocked(pegParse).mockImplementation(() => formula);
  mocked(validate).mockImplementation(() => {
    return;
  });
  expect(parse("test")).toBe(formula);
  expect(pegParse).toBeCalledWith("test");
  expect(validate).toBeCalledWith(formula);
});
