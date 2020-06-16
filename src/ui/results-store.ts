import { writable, Writable } from "svelte/store";
import { Result } from "../formula";
import { id } from "../utils/id";

const LOCAL_STORAGE_KEY = "results";

interface StoredResult {
  id: string;
  result: Result;
}

function getStore(): Writable<StoredResult[]> {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return writable(stored !== null ? JSON.parse(stored) : []);
}

const { set, subscribe, update } = getStore();

export const resultsStore = {
  subscribe,
  append(result: Result): void {
    update((results) => [{ id: id(), result }].concat(results));
  },
  clear(): void {
    set([]);
  },
};

subscribe((value) => {
  if (value.length === 0) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } else {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  }
});
