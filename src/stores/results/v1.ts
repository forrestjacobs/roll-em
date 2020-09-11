import { DBSchema, IDBPDatabase, IDBPObjectStore, openDB } from "idb";
import type { Result } from "../../formula";
import { id } from "../../utils/id";
import type { StoredResult } from "./types";
import { clean as cleanV0, load as loadV0 } from "./v0";

interface ResultsDB extends DBSchema {
  results: {
    value: StoredResult;
    key: number;
    indexes: {
      order: number;
      id: string;
      date: Date;
    };
  };
}

type DB = IDBPDatabase<ResultsDB>;

const RESULTS_STORE = "results";
const ORDER_INDEX = "order";

function migrateV0(store: IDBPObjectStore<ResultsDB, "results"[], "results">) {
  const oldResults = loadV0();
  if (oldResults !== undefined) {
    for (let i = oldResults.length - 1; i > 0; i--) {
      store.add(oldResults[i]);
    }
  }
  cleanV0();
}

function initV1(db: DB): void {
  const store = db.createObjectStore(RESULTS_STORE, {
    keyPath: ORDER_INDEX,
    autoIncrement: true,
  });
  store.createIndex("id", "id", { unique: true });
  store.createIndex("date", "date", { unique: false });

  migrateV0(store);
}

export function open(): Promise<DB> {
  return openDB("Results", 1, {
    upgrade(db) {
      initV1(db);
    },
  });
}

export async function add(db: Promise<DB>, result: Result): Promise<unknown> {
  return (await db).add(RESULTS_STORE, {
    id: id(),
    date: new Date(),
    result,
  });
}

export async function clear(db: Promise<DB>): Promise<unknown> {
  return (await db).clear(RESULTS_STORE);
}

export async function getResults(db: Promise<DB>): Promise<StoredResult[]> {
  const store = (await db).transaction(RESULTS_STORE, "readonly").store;
  let cursor = await store.openCursor(undefined, "prev");

  const results: StoredResult[] = [];
  while (cursor !== null) {
    results.push(cursor.value);
    cursor = await cursor.continue();
  }
  return results;
}
