<script>
  import { onMount } from "svelte";
  import "codemirror/lib/codemirror.css";
  import CodeMirror from "codemirror";
  import { parse, roll } from "../formula";
  import { resultsStore } from "./results-store";

  let editorContainer = undefined;
  let editor = undefined;
  let errorMessage = undefined;

  function toCodemirrorPos({ offset }) {
    return editor.posFromIndex(offset);
  }

  function submit() {
    errorMessage = undefined;
    try {
      resultsStore.append(roll(parse(editor.getValue())));
    } catch (e) {
      if (e.message) {
        errorMessage = e.message;
        if (e.location) {
          const { start, end } = e.location;
          const m = editor.markText(toCodemirrorPos(start), toCodemirrorPos(end), {
            className: "error-text",
          });
        }
      } else {
        throw e;
      }
    }
  }

  onMount(() => {
    editor = CodeMirror(editorContainer, {
      lineWrapping: true,
      screenReaderLabel: "Formula",
    });
  });
</script>

<style>
  form {
    display: flex;
  }

  .editor-container {
    flex-grow: 1;
    border: 1px solid #999;
  }

  .editor-container :global(.error-text) {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: #900;
  }

  .editor-container :global(.CodeMirror) {
    height: auto;
  }

  form button[type="submit"] {
    border: 0;
    background-color: #94a;
    color: white;
    min-width: 7em;
    flex-shrink: 0;
  }

  .error-message {
    margin-top: 0.3125em;
    font-size: 0.8em;
    color: #900;
  }

  .error-message::before {
    content: "⚠️";
    padding-right: 0.25em;
  }
</style>

<form on:submit|preventDefault={submit}>
  <div class="editor-container" bind:this={editorContainer} />
  <button type="submit">Roll</button>
</form>

{#if errorMessage}
<div class="error-message">
  {errorMessage}
</div>
{/if}
