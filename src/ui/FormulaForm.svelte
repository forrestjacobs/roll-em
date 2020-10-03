<script lang="ts">
  import type { Editor, TextMarker } from "codemirror";
  import "codemirror/lib/codemirror.css";
  import { onMount } from "svelte";
  import { parse, roll } from "../formula";
  import { getResultsStore, ResultsStoreState } from "../stores";
  import { makeEditor, markError } from "./editor";

  const resultsStore = getResultsStore();

  let editorContainer: HTMLElement | undefined = undefined;
  let editor: Editor | undefined = undefined;

  let errorMessage: string | undefined = undefined;
  let errorMark: TextMarker | undefined = undefined;

  function submit() {
    errorMessage = undefined;
    if (errorMark) {
      errorMark.clear();
    }
    errorMark = undefined;

    try {
      resultsStore.append(roll(parse(editor!.getValue())));
      editor!.execCommand("selectAll");
    } catch (e) {
      if (e.message) {
        errorMessage = e.message;
        if (e.location) {
          errorMark = markError(editor!, e.location);
        }
      } else {
        throw e;
      }
    }
  }

  function tryExample(value: string) {
    editor!.setValue(value);
    editor!.focus();
  }

  onMount(() => {
    editor = makeEditor(editorContainer!, submit);
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
    background-color: #636;
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
  {:else if $resultsStore.state === ResultsStoreState.HAS_NO_MORE && $resultsStore.results.length === 0}
    <div class="examples">
      Examples:
      <button class="show-as-link" on:click={() => tryExample('2d6')}>
        2d6
      </button>,
      <button class="show-as-link" on:click={() => tryExample('d8 + d6')}>
        d8 + d6
      </button>,
      or
      <button class="show-as-link" on:click={() => tryExample('d20 + 2')}>
        d20 + 2
      </button>
    </div>
  {/if}

</form>
