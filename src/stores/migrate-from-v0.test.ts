import type { DbV1, ResultsDBStoreV1 } from "./db";
import { migrate } from "./migrate-from-v0";

function createMockStore(): ResultsDBStoreV1 {
  return ({
    createIndex: jest.fn(),
    add: jest.fn(),
  } as unknown) as ResultsDBStoreV1;
}

function createMockDb(store: ResultsDBStoreV1): DbV1 {
  return ({ createObjectStore: jest.fn(() => store) } as unknown) as DbV1;
}

test("it makes the v1 store", () => {
  const store = createMockStore();
  const db = createMockDb(store);
  migrate(db);

  expect(db.createObjectStore).toBeCalledWith("results", expect.anything());
  expect(store.createIndex).toBeCalledWith("date", "date", expect.anything());
  expect(store.add).toBeCalledTimes(0);
});

test("it migrates v0's values from local storage", () => {
  const a = {
    id: "a",
    result: [
      { value: [11], type: "roll", count: 1, sides: 20 },
      { type: "number", value: 15 },
    ],
  };
  const b = {
    id: "b",
    result: [
      { value: [5], type: "roll", count: 1, sides: 12 },
      { type: "number", value: 10 },
    ],
  };
  const c = {
    id: "c",
    result: [
      { value: [2], type: "roll", count: 1, sides: 8 },
      { type: "number", value: 5 },
    ],
  };

  localStorage.setItem("results", JSON.stringify([a, b, c]));

  const store = createMockStore();
  const db = createMockDb(store);
  migrate(db);

  expect(store.add).toHaveBeenNthCalledWith(0, {
    date: 0,
    result: c.result,
  });
  expect(store.add).toHaveBeenNthCalledWith(1, {
    date: 0,
    result: b.result,
  });
  expect(store.add).toHaveBeenNthCalledWith(2, {
    date: 0,
    result: a.result,
  });
});
