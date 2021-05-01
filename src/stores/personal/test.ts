import { makeResultsStore } from ".";
import { makeResultsStore as internalMakeStore } from "./results-store";

jest.mock("./idb", () => ({
  makeDb: jest.fn(() => "db"),
}));
jest.mock("./results-store", () => ({
  makeResultsStore: jest.fn(() => "results-store"),
}));

test("it can make a results store", () => {
  expect(makeResultsStore()).toBe("results-store");
  expect(internalMakeStore).toBeCalledWith("db", expect.any(Number));
});
