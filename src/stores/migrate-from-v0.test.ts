import FDBFactory from "fake-indexeddb/lib/FDBFactory";
import { migrate } from "./migrate-from-v0";

const DB_NAME = "DiceDB";

function wrap<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve) => {
    request.addEventListener("success", () => {
      resolve(request.result);
    });
  });
}

function openAndMigrateDb(): Promise<IDBDatabase> {
  const open = new FDBFactory().open(DB_NAME);
  open.addEventListener("upgradeneeded", () => {
    migrate(open.result);
  });
  return wrap(open);
}

test("it makes the v1 store", async () => {
  const db = await openAndMigrateDb();

  expect(db.objectStoreNames).toEqual(["results"]);

  const store = db.transaction("results").objectStore("results");
  expect(store.keyPath).toBe("index");
  expect(store.autoIncrement).toBe(true);
  expect(store.indexNames).toEqual(["date"]);

  expect(await wrap(store.getAll())).toEqual([]);
});

test("it cleans up v0's local storage", async () => {
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

  await openAndMigrateDb();

  expect(localStorage.getItem("results")).toBe(null);
});
