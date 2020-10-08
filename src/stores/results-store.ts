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

export interface GroupedResults {
  day: Date | undefined;
  results: StoredResult[];
}

function toDate(num: number): Date | undefined {
  return num === 0 ? undefined : new Date(num);
}

function toDay(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
}

export enum ResultsStoreState {
  HAS_NO_MORE,
  HAS_MORE,
  LOADING,
}

export interface ResultsStoreValue {
  groups: GroupedResults[];
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

function combineGroups(
  lhs: GroupedResults[],
  rhs: GroupedResults[]
): GroupedResults[] {
  if (lhs.length === 0) {
    return rhs;
  } else if (rhs.length === 0) {
    return lhs;
  }

  const justLeft = lhs[lhs.length - 1];
  const justRight = rhs[0];
  if (justLeft.day?.getTime() === justRight.day?.getTime()) {
    const result = lhs.slice(0, -1);
    result.push({
      day: justLeft.day,
      results: justLeft.results.concat(justRight.results),
    });
    for (let i = 1; i < rhs.length; i++) {
      result.push(rhs[i]);
    }
    return result;
  } else {
    return lhs.concat(rhs);
  }
}

function toGroup(result: StoredResult): GroupedResults {
  const day = toDay(result.date);
  return { day, results: [result] };
}

async function fetchNextBatch(
  startingCursor: Cursor,
  batchSize: number
): Promise<{
  groups: GroupedResults[];
  hasMore: boolean;
}> {
  let cursor = startingCursor;
  let groups: GroupedResults[] = [];

  for (let i = 0; i < batchSize; i++) {
    if (cursor === null) {
      return { groups, hasMore: false };
    }

    const value = cursor.value;
    groups = combineGroups(groups, [
      toGroup({
        index: cursor.key,
        date: toDate(value.date),
        source: ResultSource.DB,
        result: value.result,
      }),
    ]);

    cursor = await cursor.continue();
  }
  return { groups, hasMore: cursor !== null };
}

export function makeResultsStore(
  db: Promise<DbV1>,
  batchSize: number
): ResultsStore {
  let value: ResultsStoreValue = {
    groups: [],
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
    const groups = value.groups;
    if (groups.length === 0) {
      return;
    }
    const lastResults = groups[groups.length - 1].results;
    return IDBKeyRange.upperBound(
      lastResults[lastResults.length - 1].index,
      true
    );
  }

  async function loadMore() {
    await wrappedLoadingUpdate(async () => {
      const query = getQuery();
      const cursor = await (await db)
        .transaction("results", "readonly")
        .store.openCursor(query, "prev");
      const { groups, hasMore } = await fetchNextBatch(cursor, batchSize);
      return {
        state: hasMore
          ? ResultsStoreState.HAS_MORE
          : ResultsStoreState.HAS_NO_MORE,
        groups: combineGroups(value.groups, groups),
      };
    });
  }

  loadMore();

  return {
    subscribe,
    async append(result: Result): Promise<void> {
      const date = Date.now();
      const index = await (await db).add("results", { date, result });
      const storedResult = toGroup({
        index,
        date: toDate(date),
        source: ResultSource.USER,
        result,
      });
      setValue({ groups: combineGroups([storedResult], value.groups) });
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
        return { state: ResultsStoreState.HAS_NO_MORE, groups: [] };
      });
    },
  };
}
