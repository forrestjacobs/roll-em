import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import type { Editor, TextMarker } from "codemirror";
import type { Formula } from "../formula";
import { resultsStore } from "../stores";
import type { StoredResult } from "../stores/results";
import { makeEditor, markError } from "./editor";
import FormulaForm from "./FormulaForm.svelte";

const resultd6 = [{ type: "roll", count: 1, sides: 6, value: [6] }];
const result2d6 = [{ type: "roll", count: 2, sides: 6, value: [6] }];

type LocationError = Error & { location?: string };

const locationError: LocationError = new Error("Error at location");
locationError.location = "5,7";

const mockParseResults: { [text: string]: Formula | Error } = {
  d6: [{ type: "roll", count: 1, sides: 6 }],
  "2d6": [{ type: "roll", count: 2, sides: 6 }],
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

function mockResults(value: StoredResult[]) {
  const mockedSubscribe = (resultsStore.subscribe as unknown) as jest.MockedFunction<
    typeof resultsStore.subscribe
  >;
  mockedSubscribe.mockImplementation((run) => {
    run(value);
    return () => void {};
  });
}

jest.mock("./editor");

function mockEditor() {
  let value = "";
  let container: HTMLElement;
  let submit: () => void;
  const editor = {
    getContainer: () => container,
    getSubmit: () => submit,
    getValue: () => value,
    execCommand: jest.fn(),
    setValue: (v: string) => (value = v),
    focus: jest.fn(),
  };
  ((makeEditor as unknown) as jest.MockedFunction<
    typeof makeEditor
  >).mockImplementation((c, s) => {
    container = c;
    submit = s;
    return (editor as unknown) as Editor;
  });
  return editor;
}

test("It can roll", async () => {
  mockResults([]);
  const editor = mockEditor();

  const result = render(FormulaForm);
  expect(editor.getContainer()).toBeInTheDocument();

  editor.setValue("d6");
  await fireEvent.click(result.getByText("Roll"));

  expect(resultsStore.append).toBeCalledWith(resultd6);
  expect(editor.execCommand).toBeCalledWith("selectAll");
});

test("It can roll by pressing enter", () => {
  mockResults([]);
  const editor = mockEditor();

  render(FormulaForm);
  editor.setValue("d6");
  editor.getSubmit()();

  expect(resultsStore.append).toBeCalledWith(resultd6);
});

test("It shows error messages", async () => {
  mockResults([]);
  const editor = mockEditor();

  const result = render(FormulaForm);
  editor.setValue("d");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.getByText("Unexpected value")).toBeTruthy();
});

test("It marks errors when there's a location", async () => {
  mockResults([]);
  const editor = mockEditor();

  const result = render(FormulaForm);
  editor.setValue("loc");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.getByText("Error at location")).toBeTruthy();
  expect(markError).toBeCalledWith(editor, "5,7");
});

test("It clears errors on the next roll", async () => {
  mockResults([]);
  const editor = mockEditor();
  const clear = jest.fn();
  ((markError as unknown) as jest.MockedFunction<
    typeof markError
  >).mockReturnValue({
    clear,
  } as unknown as TextMarker);

  const result = render(FormulaForm);
  editor.setValue("loc");
  await fireEvent.click(result.getByText("Roll"));

  editor.setValue("d6");
  await fireEvent.click(result.getByText("Roll"));
  expect(result.queryByText("Error at location")).toBe(null);
  expect(clear).toBeCalled();
});

test("It shows examples when there are no results", async () => {
  mockResults([]);
  mockEditor();

  const result = render(FormulaForm);

  expect(result.container).toHaveTextContent("Examples:");
});

test("It hides examples when there are results", async () => {
  mockResults([{ id: "test", result: [] }]);
  mockEditor();

  const result = render(FormulaForm);

  expect(result.container).not.toHaveTextContent("Examples:");
});

test("It hides examples when there are errors", async () => {
  mockResults([]);
  const editor = mockEditor();

  const result = render(FormulaForm);
  editor.setValue("d");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.container).not.toHaveTextContent("Examples:");
});

test("It rolls an example when you click it", async () => {
  mockResults([]);
  const editor = mockEditor();

  const result = render(FormulaForm);
  await fireEvent.click(result.getByText("2d6"));

  expect(editor.focus).toBeCalledWith();
  expect(resultsStore.append).toBeCalledWith(result2d6);
  expect(editor.execCommand).toBeCalledWith("selectAll");
});
