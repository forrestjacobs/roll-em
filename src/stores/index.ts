import { makeDb } from "./db";
import { makeResultsStore, ResultsStore } from "./results-store";

export {
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
  RESULTS_STORE_LOADING,
  RESULT_SOURCE_DB,
  RESULT_SOURCE_USER,
} from "./results-store";
export type {
  GroupedResults,
  ResultSource,
  ResultsStore,
  ResultsStoreState,
  StoredResult,
} from "./results-store";

const BATCH_SIZE = 50;

let resultsStore: ResultsStore | undefined = undefined;
export function getResultsStore(): ResultsStore {
  resultsStore ??= makeResultsStore(makeDb(), BATCH_SIZE);
  return resultsStore;
}
