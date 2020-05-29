import { writable } from "svelte/store";
import { Result } from "../formula";

const { subscribe, update } = writable<Result[]>([]);

export const resultsStore = {
  subscribe,
  append(result: Result): void {
    update((results) => [result].concat(results));
  },
};
