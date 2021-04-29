import type { ResultsStore } from "../types";
import { makeDb } from "./idb";
import { makeResultsStore } from "./results-store";

const BATCH_SIZE = 50;

let resultsStore: ResultsStore | undefined = undefined;
export function getResultsStore(): ResultsStore {
  resultsStore ??= makeResultsStore(makeDb(), BATCH_SIZE);
  return resultsStore;
}
