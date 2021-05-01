import type { Readable } from "svelte/store";
import type { Result } from "../formula";

export interface StoredResult {
  index: number;
  date: Date | undefined;
  roll: boolean;
  result: Result;
}

export interface GroupedResults {
  day: Date | undefined;
  results: StoredResult[];
}

export const RESULTS_STORE_LOADING = 0;
export const RESULTS_STORE_HAS_NO_MORE = 1;
export const RESULTS_STORE_HAS_MORE = 2;

export type ResultsStoreState =
  | typeof RESULTS_STORE_LOADING
  | typeof RESULTS_STORE_HAS_NO_MORE
  | typeof RESULTS_STORE_HAS_MORE;

export interface ResultsStoreValue {
  groups: GroupedResults[];
  state: ResultsStoreState;
}

export type ResultsStore = Readable<ResultsStoreValue> & {
  append(result: Result): Promise<void>;
  loadMore(): Promise<void>;
  clear(): Promise<void>;
  destroy(): Promise<void>;
};
