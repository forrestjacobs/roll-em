import { writable, Readable } from "svelte/store";
import type { Result } from "../formula";
import { id } from "../utils/id";

const LOCAL_STORAGE_KEY = "results";

export interface StoredResult {
  id: string;
  result: Result;
}

export type ResultsStore = Readable<StoredResult[]> & {
  append(result: Result): void;
  clear(): void;
};

export function makeResultsStore(): ResultsStore {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initValue: StoredResult[] = stored !== null ? JSON.parse(stored) : [];
  const { set, subscribe, update } = writable(initValue);

  subscribe((value) => {
    if (value.length === 0) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
  });

  return {
    subscribe,
    append(result: Result): void {
      update((results) => [{ id: id(), result }].concat(results));
    },
    clear(): void {
      set([]);
    },
  };
}
