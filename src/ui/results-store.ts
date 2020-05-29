import { writable } from "svelte/store";
import { Result } from "../formula";
import { id } from "../utils/id";

interface StoredResult {
  id: string;
  result: Result;
}

const { subscribe, update } = writable<StoredResult[]>([]);

export const resultsStore = {
  subscribe,
  append(result: Result): void {
    update((results) => [{ id: id(), result }].concat(results));
  },
};
