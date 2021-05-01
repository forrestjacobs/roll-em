import { writable } from "svelte/store";
import type { Result } from "../../formula";
import { add as addDb, clear, select } from "./idb";
import type {
  GroupedResults,
  ResultsStore,
  ResultsStoreValue,
  StoredResult,
} from "../types";
import {
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
  RESULTS_STORE_LOADING,
} from "../types";

/*@__PURE__*/
function toDate(num: number): Date | undefined {
  return num === 0 ? undefined : new Date(num);
}

/*@__PURE__*/
function toDay(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
}

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
  db: Promise<IDBDatabase>,
  batchSize: number
): ResultsStore {
  let value: ResultsStoreValue = {
    groups: [],
    state: RESULTS_STORE_LOADING,
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
      setValue({ state: RESULTS_STORE_LOADING });
      setValue(await callback());
    } catch (error) {
      setValue({ state: prevState });
      throw error;
    }
  }

  function getQuery(): IDBKeyRange | null {
    const groups = value.groups;
    if (groups.length === 0) {
      return null;
    }
    const lastResults = groups[groups.length - 1].results;
    return IDBKeyRange.upperBound(
      lastResults[lastResults.length - 1].key,
      true
    );
  }

  async function loadMore() {
    await wrappedLoadingUpdate(async () => {
      const query = getQuery();
      const builder = makeGroupedResultsBuilder(value.groups, 1);
      let i = 0;

      const cursor = await select(
        await db,
        "results",
        query,
        "prev",
        (cursor) => {
          const value = cursor.value;
          builder.add({
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
        groups: builder.build(),
      };
    });
  }

  loadMore();

  return {
    subscribe,
    async append(result: Result): Promise<void> {
      const date = Date.now();
      const key = (await addDb(await db, "results", {
        date,
        result,
      })) as number;
      const builder = makeGroupedResultsBuilder(value.groups, -1);
      builder.add({
        key,
        date: toDate(date),
        roll: true,
        result,
      });
      setValue({
        groups: builder.build(),
      });
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
        return { state: RESULTS_STORE_HAS_NO_MORE, groups: [] };
      });
    },
    async destroy(): Promise<void> {
      (await db).close();
    },
  };
}
