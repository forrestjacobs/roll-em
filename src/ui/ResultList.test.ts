import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import { mocked } from "ts-jest/utils";
import {
  getResultsStore,
  ResultsStore,
  ResultsStoreState,
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
  RESULT_SOURCE_USER,
} from "../stores";
import type { GroupedResults } from "../stores/results-store";
import MockResult from "./MockResult.svelte";
import ResultList from "./ResultList.svelte";

jest.mock("./Result.svelte", () => ({
  default: MockResult,
}));

jest.mock("../stores");

function mockResults(
  groups: GroupedResults[],
  state: ResultsStoreState = RESULTS_STORE_HAS_NO_MORE
): ResultsStore {
  const implementation: ResultsStore = {
    subscribe: jest.fn((run) => {
      run({ groups, state });
      return () => void {};
    }),
    append: jest.fn(),
    loadMore: jest.fn(),
    clear: jest.fn(),
  };

  mocked(getResultsStore).mockImplementation(() => implementation);

  return implementation;
}

test("it renders an empty list", () => {
  mockResults([]);
  const { container } = render(ResultList);
  expect(container.children[0]).toBeEmptyDOMElement();
});

test("it renders an entry", () => {
  mockResults([
    {
      day: new Date(2020, 9, 1),
      results: [
        {
          index: 1,
          date: new Date(2020, 9, 1, 1),
          source: RESULT_SOURCE_USER,
          result: [{ type: "number", value: 1 }],
        },
      ],
    },
  ]);

  const { container } = render(ResultList);
  expect(container).toHaveTextContent("Results");
  expect(container).toHaveTextContent("10/1/2020");
  expect(container).toHaveTextContent("1:00 AM");
  expect(container).toHaveTextContent("[ 1 ]");
});

test("it renders a 'timeless' entry", () => {
  mockResults([
    {
      day: undefined,
      results: [
        {
          index: 1,
          date: undefined,
          source: RESULT_SOURCE_USER,
          result: [{ type: "number", value: 1 }],
        },
      ],
    },
  ]);

  const { container } = render(ResultList);
  expect(container).toHaveTextContent("Results");
  expect(container).toHaveTextContent("Earlier");
  expect(container).toHaveTextContent("[ 1 ]");
});

test("it renders a 'load more' button", async () => {
  const store = mockResults([], RESULTS_STORE_HAS_MORE);

  const container = render(ResultList);
  await fireEvent.click(container.getByText("Load More"));
  expect(store.loadMore).toBeCalled();
});

test("it renders a 'clear' button", async () => {
  const store = mockResults(
    [
      {
        day: new Date(2020, 9, 1),
        results: [
          {
            index: 1,
            date: new Date(2020, 9, 1, 1),
            source: RESULT_SOURCE_USER,
            result: [{ type: "number", value: 1 }],
          },
        ],
      },
    ],
    RESULTS_STORE_HAS_NO_MORE
  );

  const container = render(ResultList);
  await fireEvent.click(container.getByText("Clear"));
  expect(store.clear).toBeCalled();
});
