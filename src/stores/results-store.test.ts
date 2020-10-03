import "fake-indexeddb/auto";
import FDBFactory from "fake-indexeddb/lib/FDBFactory";
import type { Result } from "../formula";
import { makeDb } from "./db";
import {
  makeResultsStore,
  ResultSource,
  ResultsStore,
  ResultsStoreState,
  ResultsStoreValue,
} from "./results-store";

const RESULTS: Array<{ date: Date; result: Result }> = [
  {
    date: new Date("2020-09-01"),
    result: [{ type: "number", value: 1 }],
  },
  {
    date: new Date("2020-09-02"),
    result: [{ type: "number", value: 2 }],
  },
  {
    date: new Date("2020-09-03"),
    result: [{ type: "number", value: 3 }],
  },
];

function getStoredResults(index: number, source: ResultSource) {
  const { date, result } = RESULTS[index - 1];
  return {
    index,
    date,
    source,
    result,
  };
}

const FIRST_BATCH = [
  getStoredResults(3, ResultSource.DB),
  getStoredResults(2, ResultSource.DB),
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

type NextValueExpector = (expected: ResultsStoreValue) => Promise<void>;

function makeNextValueExpector(store: ResultsStore): NextValueExpector {
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

  return (expected: ResultsStoreValue): Promise<void> => {
    return new Promise<void>((resolvePromise) => {
      function check(actual: ResultsStoreValue) {
        expect(actual).toStrictEqual(expected);
        resolvePromise();
      }

      if (queuedResults.length === 0) {
        callback = check;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        check(queuedResults.shift()!);
      }
    });
  };
}

async function expectFirstBatch(expectNextValue: NextValueExpector) {
  await expectNextValue({
    results: [],
    state: ResultsStoreState.LOADING,
  });
  await expectNextValue({
    results: FIRST_BATCH,
    state: ResultsStoreState.HAS_MORE,
  });
}

async function expectLoadingAfterFirst(expectNextValue: NextValueExpector) {
  await expectNextValue({
    results: FIRST_BATCH,
    state: ResultsStoreState.LOADING,
  });
}

beforeEach(() => {
  globalThis.indexedDB = new FDBFactory();
});

test("store initializes from scratch", async () => {
  const expectNextValue = makeNextValueExpector(makeStore());
  await expectNextValue({
    results: [],
    state: ResultsStoreState.LOADING,
  });
  await expectNextValue({
    results: [],
    state: ResultsStoreState.HAS_NO_MORE,
  });
});

test("it can append results", async () => {
  const store = makeStore();

  await appendResults(store);
  const expectNextValue = makeNextValueExpector(store);
  await expectNextValue({
    results: [
      getStoredResults(3, ResultSource.USER),
      getStoredResults(2, ResultSource.USER),
      getStoredResults(1, ResultSource.USER),
    ],
    state: ResultsStoreState.HAS_NO_MORE,
  });
});

test("it loads the first batch on init", async () => {
  await appendResults(makeStore());

  const expectNextValue = makeNextValueExpector(makeStore());
  await expectFirstBatch(expectNextValue);
});

test("it can load more", async () => {
  await appendResults(makeStore());

  const store = makeStore();
  const expectNextValue = makeNextValueExpector(store);
  await expectFirstBatch(expectNextValue);

  store.loadMore();
  await expectLoadingAfterFirst(expectNextValue);
  await expectNextValue({
    results: [
      getStoredResults(3, ResultSource.DB),
      getStoredResults(2, ResultSource.DB),
      getStoredResults(1, ResultSource.DB),
    ],
    state: ResultsStoreState.HAS_NO_MORE,
  });
});

test("it can clear results", async () => {
  await appendResults(makeStore());

  const store = makeStore();
  const expectNextValue = makeNextValueExpector(store);
  await expectFirstBatch(expectNextValue);

  store.clear();
  await expectLoadingAfterFirst(expectNextValue);
  await expectNextValue({
    results: [],
    state: ResultsStoreState.HAS_NO_MORE,
  });
});
