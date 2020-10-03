import { DbV1, makeDb } from "./db";
import { makeResultsStore, ResultsStore } from "./results-store";

export { ResultSource, ResultsStoreState } from "./results-store";
export type { ResultsStore, StoredResult } from "./results-store";

const BATCH_SIZE = 50;

let db: Promise<DbV1> | undefined = undefined;
function getDb(): Promise<DbV1> {
  db ??= makeDb();
  return db;
}

let resultsStore: ResultsStore | undefined = undefined;
export function getResultsStore(): ResultsStore {
  resultsStore ??= makeResultsStore(getDb(), BATCH_SIZE);
  return resultsStore;
}
