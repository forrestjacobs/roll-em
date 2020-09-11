import { add, clear, getResults, open } from "./v1";
import { Readable, writable } from "svelte/store";
import type { Result } from "../../formula";
import type { StoredResult } from "./types";

export type { StoredResult } from "./types";

export type ResultsStore = Readable<StoredResult[]> & {
  append(result: Result): void;
  clear(): void;
};

export function makeResultsStore(): ResultsStore {
  const db = open();

  const { set, subscribe } = writable<StoredResult[]>([]);

  async function update() {
    const value = await getResults(db);
    set(value);
  }

  update();

  return {
    subscribe,
    async append(result: Result): Promise<void> {
      await add(db, result);
      await update();
    },
    async clear(): Promise<void> {
      await clear(db);
      set([]);
    },
  };
}
