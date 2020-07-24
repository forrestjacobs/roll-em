import type { Result } from "../formula";
import { makeResultsStore, ResultsStore, StoredResult } from "./results";

jest.mock("../utils/id", () => ({
  id: () => "a",
}));

const RESULT: Result = [{ type: "number", value: 5 }];
const VALUE_WITH_RESULT = [{ id: "a", result: RESULT }];
const LOCAL_STORAGE_KEY = "results";

function populateLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(VALUE_WITH_RESULT));
}

function getValue(resultsStore: ResultsStore): StoredResult[] {
  let value!: StoredResult[];
  const unsub = resultsStore.subscribe((innerValue: StoredResult[]) => {
    value = innerValue;
  });
  unsub();
  return value;
}

afterEach(() => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});

test("It populates from local storage", () => {
  populateLocalStorage();
  expect(getValue(makeResultsStore())).toStrictEqual(VALUE_WITH_RESULT);
});

test("It creates an empty store when local storage isn't set", () => {
  expect(getValue(makeResultsStore())).toStrictEqual([]);
});

test("It adds values to store with generated ID", () => {
  const store = makeResultsStore();
  store.append(RESULT);
  expect(getValue(store)).toStrictEqual(VALUE_WITH_RESULT);
});

test("It can clear values", () => {
  populateLocalStorage();
  const store = makeResultsStore();
  store.clear();
  expect(getValue(store)).toStrictEqual([]);
});

/* eslint-disable @typescript-eslint/no-non-null-assertion */

test("It saves added values to local storage", () => {
  const store = makeResultsStore();
  store.append(RESULT);
  const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  expect(storedValue).not.toBeNull();
  expect(JSON.parse(storedValue!)).toStrictEqual(VALUE_WITH_RESULT);
});

test("It deletes local storage when cleared", () => {
  populateLocalStorage();
  const store = makeResultsStore();
  store.clear();
  expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull();
});
