import type { ClearableResultsStore, ResultsStore } from "../types";
import { makeDb } from "./idb";
import { makeResultsStore as internalMakeStore } from "./results-store";

const BATCH_SIZE = 50;

export function makeResultsStore(): ResultsStore & ClearableResultsStore {
  return internalMakeStore(makeDb(), BATCH_SIZE);
}
