import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import type { Formula } from "../formula";
import type { GroupedResults, ResultsStore } from "../stores";
import { RESULTS_STORE_HAS_NO_MORE } from "../stores";
import FormulaForm from "./FormulaForm.svelte";

const resultd6 = [{ type: "roll", count: 1, sides: 6, value: [6] }];

type LocationError = Error & { location?: { start: { offset: number } } };

const locationError: LocationError = new Error("Error at location");
locationError.location = {
  start: {
    offset: 1,
  },
};

const mockParseResults: { [text: string]: Formula | Error } = {
  d6: [{ type: "roll", count: 1, sides: 6 }],
  "d20 + 2": [
    { type: "roll", count: 1, sides: 20 },
    { type: "number", value: 2 },
  ],
  d: new Error("Unexpected value"),
  loc: locationError,
};

jest.mock("../formula", () => ({
  parse: (text: string) => {
    const result = mockParseResults[text];
    if (Array.isArray(result)) {
      return result;
    } else {
      throw result;
    }
  },
  roll: (formula: Formula) =>
    formula.map((term) =>
      term.type === "roll" ? { value: [term.sides], ...term } : term
    ),
}));

jest.mock("../stores");

function mockResults(groups: GroupedResults[]): ResultsStore {
  return {
    subscribe: jest.fn((run) => {
      run({ groups, state: RESULTS_STORE_HAS_NO_MORE });
      return () => void {};
    }),
    append: jest.fn(),
    loadMore: jest.fn(),
    destroy: jest.fn(),
  };
}

function expectFieldToBeSelected(field: HTMLTextAreaElement) {
  expect(field).toHaveFocus();

  const range = [field.selectionStart, field.selectionEnd].sort();
  expect(range).toStrictEqual([0, field.value.length]);
}

test("It can roll", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });

  const field = result.getByRole("textbox") as HTMLTextAreaElement;
  await userEvent.type(field, "d6");
  await fireEvent.click(result.getByText("Roll"));

  expect(resultsStore.append).toBeCalledWith(resultd6);
  expectFieldToBeSelected(field);
});

test("It can roll by pressing enter", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });
  const field = result.getByRole("textbox");
  await userEvent.type(field, "d6");
  await fireEvent(
    field,
    new KeyboardEvent("keypress", { code: "Enter", shiftKey: false })
  );

  expect(resultsStore.append).toBeCalledWith(resultd6);
});

test("It shows error messages", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });
  const field = result.getByRole("textbox");
  await userEvent.type(field, "d");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.getByText("Unexpected value")).toBeTruthy();
});

test("It marks errors when there's a location", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });
  const field = result.getByRole("textbox");
  await userEvent.type(field, "loc");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.getByText("Error at location")).toBeTruthy();
  expect(result.getByText("o").classList).toContain("error-text");
});

test("It clears errors on the next roll", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });
  const field = result.getByRole("textbox");
  const button = result.getByText("Roll");

  await userEvent.type(field, "loc");
  await fireEvent.click(button);

  userEvent.clear(field);
  await userEvent.type(field, "d6");
  await fireEvent.click(button);

  expect(result.queryByText("Error at location")).toBe(null);
});

test("It shows help text when there are no errors", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });

  expect(result.container).toHaveTextContent(
    "Type in your roll using standard D&D notation."
  );
});

test("It hides examples when there are errors", async () => {
  const resultsStore = mockResults([]);

  const result = render(FormulaForm, { resultsStore });
  const field = result.getByRole("textbox");
  await userEvent.type(field, "d");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.container).not.toHaveTextContent(
    "Type in your roll using standard D&D notation."
  );
});
