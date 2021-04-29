import { getResultsStore } from ".";
import { makeDb } from "./idb";
import { makeResultsStore } from "./results-store";

jest.mock("./idb", () => ({
  makeDb: jest.fn(() => "db"),
}));
jest.mock("./results-store", () => ({
  makeResultsStore: jest.fn(() => "results-store"),
}));

test("it can get a results store", () => {
  expect(getResultsStore()).toBe("results-store");
  expect(makeResultsStore).toBeCalledWith("db", expect.any(Number));
});

test("it uses the same db and results store", () => {
  getResultsStore();
  getResultsStore();
  expect(makeDb).toBeCalledTimes(1);
  expect(makeResultsStore).toBeCalledTimes(1);
});
