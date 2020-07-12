<script>
  import { onMount } from "svelte";
  import "codemirror/lib/codemirror.css";
  import { makeEditor, markError } from "./editor";
  import { parse, roll } from "../formula";
  import { resultsStore } from "./results-store";

  let editorContainer = undefined;
  let editor = undefined;

  let showExamples = false;
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
      editor.execCommand("selectAll");
    } catch (e) {
      if (e.message && e.location) {
        errorMessage = e.message;
        errorMark = markError(editor, e.location);
      } else {
        throw e;
      }
    }
  }

  function tryExample(value) {
    showExamples = true;
    editor.setValue(value);
    editor.focus();
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

  .editor-container :global(.CodeMirror) {
    font-family: inherit;
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

  .examples {
    padding-top: 1em;
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

  <div class="examples">
    {#if showExamples || $resultsStore.length === 0}
      <h2>
        Examples
        {#if $resultsStore.length !== 0}
          <button
            class="show-as-link"
            on:click|preventDefault={() => (showExamples = false)}>
            (Hide)
          </button>
        {/if}
      </h2>
      <p>
        <button class="show-as-link" on:click={() => tryExample('2d6')}>
          2d6
        </button>
        : roll two six-sided dice.
      </p>
      <p>
        <button class="show-as-link" on:click={() => tryExample('d8 + d6')}>
          d8 + d6
        </button>
        : roll an eight-sided die and a six-sided die.
      </p>
      <p>
        <button class="show-as-link" on:click={() => tryExample('d20 + 2')}>
          d20 + 2
        </button>
        : roll one twenty-sided die and add two to the result.
      </p>
    {:else}
      <button
        class="show-as-link"
        on:click|preventDefault={() => (showExamples = true)}>
        Show examples
      </button>
    {/if}
  </div>
</form>
