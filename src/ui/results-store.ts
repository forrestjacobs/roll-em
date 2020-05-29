import { writable } from "svelte/store";
import { Result } from "../formula";

const { subscribe, update } = writable<Result[]>([]);

export const resultsStore = {
  subscribe,
  append(result: Result) {
    update((results) => [result].concat(results));
  },
};
