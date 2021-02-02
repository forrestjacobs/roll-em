type RollTermV0 = {
  type: "roll";
  count: number;
  sides: number;
  value: number[];
};
type NumberTermV0 = { type: "number"; value: number };
type ResultTermV0 = RollTermV0 | NumberTermV0;

const LOCAL_STORAGE_KEY_V0 = "results";

function makeResultsStore(db: IDBDatabase): IDBObjectStore {
  const store = db.createObjectStore("results", {
    keyPath: "index",
    autoIncrement: true,
  });
  store.createIndex("date", "date", {
    unique: false,
  });
  return store;
}

function isV0Term(obj: unknown): obj is ResultTermV0 {
  return (
    obj !== undefined &&
    obj !== null &&
    (((obj as ResultTermV0).type === "number" &&
      typeof (obj as NumberTermV0).value === "number") ||
      ((obj as ResultTermV0).type === "roll" &&
        typeof (obj as RollTermV0).count === "number" &&
        typeof (obj as RollTermV0).sides === "number" &&
        Array.isArray((obj as RollTermV0).value) &&
        (obj as RollTermV0).value.every((e) => typeof e === "number")))
  );
}

function migrateLocalStorageResults(store: IDBObjectStore): void {
  const resultsItem = localStorage.getItem(LOCAL_STORAGE_KEY_V0);
  if (resultsItem === null) {
    return;
  }

  const results = JSON.parse(resultsItem);
  if (Array.isArray(results)) {
    for (let i = results.length - 1; i >= 0; i--) {
      const result = results[i]?.result;
      if (Array.isArray(result) && result.every(isV0Term)) {
        store.add({
          date: 0,
          result: result,
        });
      }
    }
  }

  localStorage.removeItem(LOCAL_STORAGE_KEY_V0);
}

export function migrate(db: IDBDatabase): void {
  migrateLocalStorageResults(makeResultsStore(db));
}
