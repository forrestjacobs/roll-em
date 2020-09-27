import type { DbV1, ResultsDBStoreV1 } from "./db";

type ResultTermV0 =
  | { type: "number"; value: number }
  | { type: "roll"; count: number; sides: number; value: number[] };

interface StoredResultV0 {
  id: string;
  result: ResultTermV0[];
}

const LOCAL_STORAGE_KEY_V0 = "results";

function makeResultsStore(db: DbV1): ResultsDBStoreV1 {
  const store: ResultsDBStoreV1 = db.createObjectStore("results", {
    keyPath: "index",
    autoIncrement: true,
  });
  store.createIndex("date", "date", {
    unique: false,
  });
  return store;
}

function migrateLocalStorageResults(store: ResultsDBStoreV1): void {
  const resultsItem = localStorage.getItem(LOCAL_STORAGE_KEY_V0);
  if (resultsItem === null) {
    return;
  }

  const results = JSON.parse(resultsItem) as StoredResultV0[];
  for (let i = results.length - 1; i >= 0; i--) {
    store.add({
      date: 0,
      result: results[i].result,
    });
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY_V0);
}

export function migrate(db: DbV1): void {
  migrateLocalStorageResults(makeResultsStore(db));
}
