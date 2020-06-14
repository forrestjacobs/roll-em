import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple.js";
import { LocationRange } from "pegjs";

declare module "codemirror" {
  function defineSimpleMode(
    name: string,
    states: Record<string, unknown>
  ): void;
}

CodeMirror.defineSimpleMode("dice", {
  start: [
    { regex: /[0-9]+/, token: "number" },
    { regex: /[+-]+/, token: "operator" },
    { regex: /[dD]/, token: "keyword" },
  ],
});

export function makeEditor(
  container: HTMLElement,
  submit: () => void
): CodeMirror.Editor {
  return CodeMirror(container, {
    extraKeys: {
      Enter: (): void => submit(),
    },
    lineWrapping: true,
    mode: "dice",
    screenReaderLabel: "Formula",
  });
}

export function markError(
  editor: CodeMirror.Editor,
  range: LocationRange
): CodeMirror.TextMarker {
  return editor.markText(
    editor.posFromIndex(range.start.offset),
    editor.posFromIndex(range.end.offset),
    {
      className: "error-text",
    }
  );
}
