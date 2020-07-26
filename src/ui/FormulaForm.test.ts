import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/svelte";
import type { Formula } from "../formula";
import { resultsStore } from "../stores";
import type { StoredResult } from "../stores/results";
import FormulaForm from "./FormulaForm.svelte";
import { makeEditor } from "./editor";
import type { Editor } from "codemirror";

const d6result = [{ type: "roll", count: 1, sides: 6, value: [6] }];

const mockParseResults: { [text: string]: Formula | Error } = {
  d6: [{ type: "roll", count: 1, sides: 6 }],
  d: new Error("Unexpected value"),
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

  expect(resultsStore.append).toBeCalledWith(d6result);
  expect(editor.execCommand).toBeCalledWith("selectAll");
});

test("It can roll by pressing enter", () => {
  mockResults([]);
  const editor = mockEditor();

  render(FormulaForm);
  editor.setValue("d6");
  editor.getSubmit()();

  expect(resultsStore.append).toBeCalledWith(d6result);
});

test("It shows error messages", async () => {
  mockResults([]);
  const editor = mockEditor();

  const result = render(FormulaForm);
  editor.setValue("d");
  await fireEvent.click(result.getByText("Roll"));

  expect(result.getByText("Unexpected value")).toBeTruthy();
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
