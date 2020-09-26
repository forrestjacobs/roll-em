import { DBSchema, IDBPDatabase, IDBPObjectStore, openDB } from "idb";
import type { Result } from "../formula";
import { migrate as migrateV0 } from "./migrate-from-v0";

export interface SchemaV1 extends DBSchema {
  results: {
    value: {
      date: number;
      result: Result;
    };
    key: number;
    indexes: {
      index: number;
      date: number;
    };
  };
}

export type DbV1 = IDBPDatabase<SchemaV1>;
export type ResultsDBStoreV1 = IDBPObjectStore<
  SchemaV1,
  "results"[],
  "results"
>;

const DB_NAME = "DiceDB";

export function connect(): Promise<DbV1> {
  return openDB<SchemaV1>(DB_NAME, 1, {
    upgrade(db, oldVersion) {
      if (oldVersion <= 0) {
        migrateV0(db);
      }
    },
  });
}
