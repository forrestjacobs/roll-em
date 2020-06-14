<script>
  import { onMount } from "svelte";
  import "codemirror/lib/codemirror.css";
  import { makeEditor, markError } from "./editor";
  import { parse, roll } from "../formula";
  import { resultsStore } from "./results-store";

  let editorContainer = undefined;
  let editor = undefined;

  let errorMessage = undefined;
  let errorMark = undefined;

  function submit() {
    errorMessage = undefined;
    if (errorMark) {
      errorMark.clear();
    }
    errorMark = undefined;

    try {
      resultsStore.append(roll(parse(editor.getValue())));
    } catch (e) {
      if (e.message && e.location) {
        errorMessage = e.message;
        errorMark = markError(editor, e.location);
      } else {
        throw e;
      }
    }
  }

  onMount(() => {
    editor = makeEditor(editorContainer, submit);
  });
</script>

<style>
  form {
    padding: 1em;
  }

  .row {
    display: flex;
  }

  .editor-container {
    flex-grow: 1;
    border: 1px solid #999;
  }

  .editor-container :global(.error-text) {
    box-shadow: inset 0 0 0 #fff, inset 0 -0.125em 0 #900;
  }

  .editor-container :global(.error-bookmark) {
    display: inline-block;
    position: relative;
    left: -0.2em;
    top: 0.375em;
    border: 0.25em solid #fff;
    border-top-width: 0;
    border-bottom-color: #900;
  }

  .editor-container :global(.CodeMirror) {
    height: auto;
  }

  form button[type="submit"] {
    border: 0;
    background-color: #94a;
    font-size: 1em;
    color: white;
    min-width: 8em;
    flex-shrink: 0;
  }

  .error-message {
    padding: 0.3em 0;
    font-size: 0.833em;
    color: #900;
  }

  .error-message::before {
    content: "⚠️";
    padding-right: 0.25em;
  }
</style>

<form on:submit|preventDefault={submit}>
  <div class="row">
    <div class="editor-container" bind:this={editorContainer} />
    <button type="submit">Roll</button>
  </div>
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}
</form>
