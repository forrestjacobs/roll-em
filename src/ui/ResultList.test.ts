import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import {
  ClearableResultsStore,
  GroupedResults,
  ResultsStore,
  ResultsStoreState,
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
} from "../stores";
import MockResult from "./MockResult.svelte";
import ResultList from "./ResultList.svelte";

jest.mock("./Result.svelte", () => ({
  default: MockResult,
}));

jest.mock("../stores");

function mockResults(
  groups: GroupedResults[],
  state: ResultsStoreState = RESULTS_STORE_HAS_NO_MORE
): ResultsStore & ClearableResultsStore {
  return {
    subscribe: jest.fn((run) => {
      run({ groups, state });
      return () => void {};
    }),
    append: jest.fn(),
    loadMore: jest.fn(),
    clear: jest.fn(),
    destroy: jest.fn(),
  };
}

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

test("it renders an empty list", () => {
  const resultsStore = mockResults([]);
  const { container } = render(ResultList, { resultsStore });
  expect(container.innerHTML).toBe("<div></div>");
});

test("it renders an entry", () => {
  const resultsStore = mockResults([
    {
      day: new Date(2020, 9, 1),
      results: [
        {
          key: 1,
          date: new Date(2020, 9, 1, 1),
          roll: true,
          result: [{ type: "number", value: 1 }],
        },
      ],
    },
  ]);

  const { container } = render(ResultList, { resultsStore });
  expect(container).toHaveTextContent("Results");
  expect(container).toHaveTextContent("10/1/2020");
  expect(container).toHaveTextContent("1:00 AM");
  expect(container).toHaveTextContent("[ 1 ]");
});

test("it renders a 'timeless' entry", () => {
  const resultsStore = mockResults([
    {
      day: undefined,
      results: [
        {
          key: 1,
          date: undefined,
          roll: true,
          result: [{ type: "number", value: 1 }],
        },
      ],
    },
  ]);

  const { container } = render(ResultList, { resultsStore });
  expect(container).toHaveTextContent("Results");
  expect(container).toHaveTextContent("Earlier");
  expect(container).toHaveTextContent("[ 1 ]");
});

test("it renders a 'load more' button", async () => {
  const resultsStore = mockResults([], RESULTS_STORE_HAS_MORE);

  const container = render(ResultList, { resultsStore });
  await fireEvent.click(container.getByText("Load More"));
  expect(resultsStore.loadMore).toBeCalled();
});

test("it renders a 'clear' button", async () => {
  const resultsStore = mockResults(
    [
      {
        day: new Date(2020, 9, 1),
        results: [
          {
            key: 1,
            date: new Date(2020, 9, 1, 1),
            roll: true,
            result: [{ type: "number", value: 1 }],
          },
        ],
      },
    ],
    RESULTS_STORE_HAS_NO_MORE
  );

  const container = render(ResultList, { resultsStore });
  await fireEvent.click(container.getByText("Clear"));
  expect(resultsStore.clear).toBeCalled();
});
