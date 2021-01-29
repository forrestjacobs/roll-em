import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import { getResultsStore, ResultsStore, ResultsStoreState } from "../stores";
import { GroupedResults, ResultSource } from "../stores/results-store";
import MockResult from "./MockResult.svelte";
import ResultList from "./ResultList.svelte";

jest.mock("./Result.svelte", () => ({
  default: MockResult,
}));

jest.mock("../stores");

function mockResults(
  groups: GroupedResults[],
  state: ResultsStoreState = ResultsStoreState.HAS_NO_MORE,
  etc: Partial<ResultsStore> = {}
): ResultsStore {
  const implementation = ({
    subscribe: jest.fn((run) => {
      run({ groups, state });
      return () => void {};
    }),
    append: jest.fn(),
    ...etc,
  } as unknown) as ResultsStore;

  ((getResultsStore as unknown) as jest.MockedFunction<
    typeof getResultsStore
  >).mockImplementation(() => implementation);

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
          source: ResultSource.USER,
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
          source: ResultSource.USER,
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
  const loadMore = jest.fn();
  mockResults([], ResultsStoreState.HAS_MORE, { loadMore });

  const container = render(ResultList);
  await fireEvent.click(container.getByText("Load More"));
  expect(loadMore).toBeCalled();
});

test("it renders a 'clear' button", async () => {
  const clear = jest.fn();
  mockResults(
    [
      {
        day: new Date(2020, 9, 1),
        results: [
          {
            index: 1,
            date: new Date(2020, 9, 1, 1),
            source: ResultSource.USER,
            result: [{ type: "number", value: 1 }],
          },
        ],
      },
    ],
    ResultsStoreState.HAS_NO_MORE,
    { clear }
  );

  const container = render(ResultList);
  await fireEvent.click(container.getByText("Clear"));
  expect(clear).toBeCalled();
});
