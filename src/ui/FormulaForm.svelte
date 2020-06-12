<script>
  import { onMount } from "svelte";
  import "codemirror/lib/codemirror.css";
  import CodeMirror from "codemirror";
  import { parse, roll } from "../formula";
  import { resultsStore } from "./results-store";

  let editorContainer = undefined;
  let editor = undefined;

  let error = undefined;

  function submit() {
    try {
      resultsStore.append(roll(parse(editor.getValue())));
    } catch (e) {
      error = e;
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
</style>

<form on:submit|preventDefault={submit}>
  <div class="editor-container" bind:this={editorContainer} />
  <button type="submit">Roll</button>
</form>

{#if error}
  <div>{JSON.stringify(error)}</div>
{/if}
