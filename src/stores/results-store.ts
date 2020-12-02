import { Readable, writable } from "svelte/store";
import type { Result } from "../formula";
import type { DbV1 } from "./db";

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

interface Builder {
  add(result: StoredResult): void;
  build(): GroupedResults[];
}

type Direction = -1 | 1;

function add<T>(target: T[], value: T, direction: Direction): void {
  if (direction === -1) {
    target.unshift(value);
  } else {
    target.push(value);
  }
}

function makeGroupedResultsBuilder(
  start: GroupedResults[],
  direction: Direction
): Builder {
  const target = start.slice();

  // Copy the end we're building on
  if (target.length !== 0) {
    const targetIndex = direction == -1 ? 0 : target.length - 1;
    const group = target[targetIndex];
    target[targetIndex] = {
      day: group.day,
      results: group.results.slice(),
    };
  }

  return {
    add(result: StoredResult) {
      const day = toDay(result.date);
      const targetIndex = direction == -1 ? 0 : target.length - 1;
      if (
        target.length !== 0 &&
        target[targetIndex].day?.getTime() === day?.getTime()
      ) {
        add(target[targetIndex].results, result, direction);
      } else {
        add(target, { day, results: [result] }, direction);
      }
    },
    build() {
      return target;
    },
  };
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
      let cursor = await (await db)
        .transaction("results", "readonly")
        .store.openCursor(query, "prev");

      const builder = makeGroupedResultsBuilder(value.groups, 1);
      for (let i = 0; i < batchSize && cursor !== null; i++) {
        const value = cursor.value;
        builder.add({
          index: cursor.key,
          date: toDate(value.date),
          source: ResultSource.DB,
          result: value.result,
        });

        cursor = await cursor.continue();
      }

      return {
        state:
          cursor !== null
            ? ResultsStoreState.HAS_MORE
            : ResultsStoreState.HAS_NO_MORE,
        groups: builder.build(),
      };
    });
  }

  loadMore();

  return {
    subscribe,
    async append(result: Result): Promise<void> {
      const date = Date.now();
      const index = await (await db).add("results", { date, result });
      const builder = makeGroupedResultsBuilder(value.groups, -1);
      builder.add({
        index,
        date: toDate(date),
        source: ResultSource.USER,
        result,
      });
      setValue({
        groups: builder.build(),
      });
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
