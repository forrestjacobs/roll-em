import type { IDBPCursorWithValue } from "idb";
import { Readable, writable } from "svelte/store";
import type { Result } from "../formula";
import type { DbV1, SchemaV1 } from "./db";

export enum ResultSource {
  USER,
  DB,
}

export interface StoredResult {
  index: number;
  date: Date | undefined;
  source: ResultSource;
  result: Result;
}

function toDate(num: number): Date | undefined {
  return num === 0 ? undefined : new Date(num);
}

export enum ResultsStoreState {
  HAS_NO_MORE,
  HAS_MORE,
  LOADING,
}

export interface ResultsStoreValue {
  results: StoredResult[];
  state: ResultsStoreState;
}

export type ResultsStore = Readable<ResultsStoreValue> & {
  append(result: Result): Promise<void>;
  loadMore(): Promise<void>;
  clear(): Promise<void>;
};

type Cursor = IDBPCursorWithValue<
  SchemaV1,
  ["results"],
  "results",
  unknown
> | null;

async function fetchNextBatch(
  startingCursor: Cursor,
  batchSize: number
): Promise<{
  results: StoredResult[];
  hasMore: boolean;
}> {
  let cursor = startingCursor;
  const results: StoredResult[] = [];

  for (let i = 0; i < batchSize; i++) {
    if (cursor === null) {
      return { results, hasMore: false };
    }

    const value = cursor.value;
    results.push({
      index: cursor.key,
      date: toDate(value.date),
      source: ResultSource.DB,
      result: value.result,
    });

    cursor = await cursor.continue();
  }
  return { results, hasMore: cursor !== null };
}

export function makeResultsStore(
  db: Promise<DbV1>,
  batchSize: number
): ResultsStore {
  let value: ResultsStoreValue = {
    results: [],
    state: ResultsStoreState.LOADING,
  };

  const { set, subscribe } = writable<ResultsStoreValue>(value);

  function setValue(partialValue: Partial<ResultsStoreValue>) {
    value = { ...value, ...partialValue };
    set(value);
  }

  async function wrappedLoadingUpdate(
    callback: () => Promise<Partial<ResultsStoreValue>>
  ): Promise<void> {
    const prevState = value.state;
    try {
      setValue({ state: ResultsStoreState.LOADING });
      setValue(await callback());
    } catch (error) {
      setValue({ state: prevState });
      throw error;
    }
  }

  function getQuery(): IDBKeyRange | undefined {
    const results = value.results;
    return results.length === 0
      ? undefined
      : IDBKeyRange.upperBound(results[results.length - 1].index, true);
  }

  async function loadMore() {
    await wrappedLoadingUpdate(async () => {
      const query = getQuery();
      const cursor = await (await db)
        .transaction("results", "readonly")
        .store.openCursor(query, "prev");
      const { results, hasMore } = await fetchNextBatch(cursor, batchSize);
      return {
        state: hasMore
          ? ResultsStoreState.HAS_MORE
          : ResultsStoreState.HAS_NO_MORE,
        results: value.results.concat(results),
      };
    });
  }

  loadMore();

  return {
    subscribe,
    async append(result: Result): Promise<void> {
      const date = Date.now();
      const index = await (await db).add("results", { date, result });
      const storedResult: StoredResult = {
        index,
        date: toDate(date),
        source: ResultSource.USER,
        result,
      };
      setValue({ results: [storedResult].concat(value.results) });
    },
    async loadMore(): Promise<void> {
      if (value.state === ResultsStoreState.HAS_MORE) {
        await loadMore();
      }
    },
    async clear(): Promise<void> {
      if (value.state === ResultsStoreState.LOADING) {
        return;
      }

      await wrappedLoadingUpdate(async () => {
        await (await db).clear("results");
        return { state: ResultsStoreState.HAS_NO_MORE, results: [] };
      });
    },
  };
}
