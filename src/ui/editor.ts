import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple.js";
import type { LocationRange } from "pegjs";

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
    autofocus: true,
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
  const start = range.start.offset;
  const end = range.end.offset;

  const startPos = editor.posFromIndex(start);
  if (start === end) {
    const widget = document.createElement("span");
    widget.className = "error-bookmark";

    return editor.setBookmark(startPos, { insertLeft: true, widget });
  }

  return editor.markText(startPos, editor.posFromIndex(end), {
    className: "error-text",
  });
}
