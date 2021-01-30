import "fake-indexeddb/auto";
import FDBFactory from "fake-indexeddb/lib/FDBFactory";
import type { Result } from "../formula";
import { makeDb } from "./db";
import {
  makeResultsStore,
  ResultSource,
  ResultsStore,
  ResultsStoreValue,
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
  RESULTS_STORE_LOADING,
  RESULT_SOURCE_DB,
  RESULT_SOURCE_USER,
} from "./results-store";

const RESULTS: Array<{ date: Date; result: Result }> = [
  {
    date: new Date(2020, 9, 1),
    result: [{ type: "number", value: 1 }],
  },
  {
    date: new Date(2020, 9, 2),
    result: [{ type: "number", value: 2 }],
  },
  {
    date: new Date(2020, 9, 3),
    result: [{ type: "number", value: 3 }],
  },
];

function getGroup(index: number, source: ResultSource) {
  const { date, result } = RESULTS[index - 1];
  return {
    day: date,
    results: [
      {
        index,
        date,
        source,
        result,
      },
    ],
  };
}

const FIRST_BATCH = [
  getGroup(3, RESULT_SOURCE_DB),
  getGroup(2, RESULT_SOURCE_DB),
];

function makeStore(): ResultsStore {
  return makeResultsStore(makeDb(), 2);
}

async function appendResults(store: ResultsStore) {
  const nowSpy = jest.spyOn(globalThis.Date, "now");
  for (const { date, result } of RESULTS) {
    nowSpy.mockImplementationOnce(() => date.valueOf());
    await store.append(result);
  }
}

type NextValueAccessor = () => Promise<ResultsStoreValue>;

function makeNextValueAccessor(store: ResultsStore): NextValueAccessor {
  let callback: ((actual: ResultsStoreValue) => void) | undefined = undefined;
  const queuedResults: ResultsStoreValue[] = [];
  const mockSubscriber = jest.fn<void, [ResultsStoreValue]>((v) => {
    if (callback) {
      const cb = callback;
      callback = undefined;
      cb(v);
    } else {
      queuedResults.push(v);
    }
  });
  store.subscribe(mockSubscriber);

  return (): Promise<ResultsStoreValue> => {
    return new Promise<ResultsStoreValue>((resolve) => {
      if (queuedResults.length === 0) {
        callback = resolve;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        resolve(queuedResults.shift()!);
      }
    });
  };
}

async function expectFirstBatch(getNextValue: NextValueAccessor) {
  expect(await getNextValue()).toStrictEqual({
    groups: [],
    state: RESULTS_STORE_LOADING,
  });
  expect(await getNextValue()).toStrictEqual({
    groups: FIRST_BATCH,
    state: RESULTS_STORE_HAS_MORE,
  });
}

async function expectLoadingAfterFirst(getNextValue: NextValueAccessor) {
  expect(await getNextValue()).toStrictEqual({
    groups: FIRST_BATCH,
    state: RESULTS_STORE_LOADING,
  });
}

beforeEach(() => {
  globalThis.indexedDB = new FDBFactory();
});

test("store initializes from scratch", async () => {
  const getNextValue = makeNextValueAccessor(makeStore());
  expect(await getNextValue()).toStrictEqual({
    groups: [],
    state: RESULTS_STORE_LOADING,
  });
  expect(await getNextValue()).toStrictEqual({
    groups: [],
    state: RESULTS_STORE_HAS_NO_MORE,
  });
});

test("it can append results", async () => {
  const store = makeStore();

  await appendResults(store);
  const getNextValue = makeNextValueAccessor(store);
  expect(await getNextValue()).toStrictEqual({
    groups: [
      getGroup(3, RESULT_SOURCE_USER),
      getGroup(2, RESULT_SOURCE_USER),
      getGroup(1, RESULT_SOURCE_USER),
    ],
    state: RESULTS_STORE_HAS_NO_MORE,
  });
});

test("it loads the first batch on init", async () => {
  await appendResults(makeStore());

  const getNextValue = makeNextValueAccessor(makeStore());
  await expectFirstBatch(getNextValue);
});

test("it can load more", async () => {
  await appendResults(makeStore());

  const store = makeStore();
  const getNextValue = makeNextValueAccessor(store);
  await expectFirstBatch(getNextValue);

  store.loadMore();
  await expectLoadingAfterFirst(getNextValue);
  expect(await getNextValue()).toStrictEqual({
    groups: [
      getGroup(3, RESULT_SOURCE_DB),
      getGroup(2, RESULT_SOURCE_DB),
      getGroup(1, RESULT_SOURCE_DB),
    ],
    state: RESULTS_STORE_HAS_NO_MORE,
  });
});

test("it can clear results", async () => {
  await appendResults(makeStore());

  const store = makeStore();
  const getNextValue = makeNextValueAccessor(store);
  await expectFirstBatch(getNextValue);

  await store.clear();
  await expectLoadingAfterFirst(getNextValue);
  expect(await getNextValue()).toStrictEqual({
    groups: [],
    state: RESULTS_STORE_HAS_NO_MORE,
  });
});
