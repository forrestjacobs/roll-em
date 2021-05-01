import type { ResultsStore } from "../types";
import { makeDb } from "./idb";
import { makeResultsStore as internalMakeStore } from "./results-store";

const BATCH_SIZE = 50;

export function makeResultsStore(): ResultsStore {
  return internalMakeStore(makeDb(), BATCH_SIZE);
}
