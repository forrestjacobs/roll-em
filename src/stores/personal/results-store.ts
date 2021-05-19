import { writable } from "svelte/store";
import type { Result } from "../../formula";
import { grouped, ListResultsStoreValue } from "../grouped";
import type {
  ClearableResultsStore,
  ResultsStore,
  StoredResult,
} from "../types";
import {
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
  RESULTS_STORE_LOADING,
} from "../types";
import { add as addDb, clear, select } from "./idb";

/*@__PURE__*/
function toDate(num: number): Date | undefined {
  return num === 0 ? undefined : new Date(num);
}

export function makeResultsStore(
  db: Promise<IDBDatabase>,
  batchSize: number
): ResultsStore & ClearableResultsStore {
  let value: ListResultsStoreValue = {
    results: [],
    state: RESULTS_STORE_LOADING,
  };

  const store = writable<ListResultsStoreValue>(value);

  function setValue(partialValue: Partial<ListResultsStoreValue>) {
    value = { ...value, ...partialValue };
    store.set(value);
  }

  async function wrappedLoadingUpdate(
    callback: () => Promise<Partial<ListResultsStoreValue>>
  ): Promise<void> {
    const prevState = value.state;
    try {
      setValue({ state: RESULTS_STORE_LOADING });
      setValue(await callback());
    } catch (error) {
      setValue({ state: prevState });
      throw error;
    }
  }

  async function loadMore() {
    await wrappedLoadingUpdate(async () => {
      const results: StoredResult[] = value.results.slice();
      const query =
        results.length === 0
          ? null
          : IDBKeyRange.upperBound(results[results.length - 1].key, true);

      let i = 0;
      const cursor = await select(
        await db,
        "results",
        query,
        "prev",
        (cursor) => {
          const value = cursor.value;
          results.push({
            key: cursor.key,
            date: toDate(value.date),
            roll: false,
            result: value.result,
          });
          i++;
          return i < batchSize;
        }
      );

      return {
        state:
          cursor !== null ? RESULTS_STORE_HAS_MORE : RESULTS_STORE_HAS_NO_MORE,
        results,
      };
    });
  }

  loadMore();

  return {
    subscribe: grouped(store).subscribe,
    async append(result: Result): Promise<void> {
      const date = Date.now();
      const key = (await addDb(await db, "results", {
        date,
        result,
      })) as number;
      const results: StoredResult[] = value.results.slice();
      results.unshift({
        key,
        date: toDate(date),
        roll: true,
        result,
      });
      setValue({ results });
    },
    async loadMore(): Promise<void> {
      if (value.state === RESULTS_STORE_HAS_MORE) {
        await loadMore();
      }
    },
    async clear(): Promise<void> {
      if (value.state === RESULTS_STORE_LOADING) {
        return;
      }

      await wrappedLoadingUpdate(async () => {
        await clear(await db, "results");
        return { state: RESULTS_STORE_HAS_NO_MORE, results: [] };
      });
    },
    async destroy(): Promise<void> {
      (await db).close();
    },
  };
}
