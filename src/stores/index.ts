import { makeDb } from "./db";
import { makeResultsStore, ResultsStore } from "./results-store";

export { ResultSource, ResultsStoreState } from "./results-store";
export type { ResultsStore, StoredResult } from "./results-store";

const BATCH_SIZE = 50;

let resultsStore: ResultsStore | undefined = undefined;
export function getResultsStore(): ResultsStore {
  resultsStore ??= makeResultsStore(makeDb(), BATCH_SIZE);
  return resultsStore;
}
