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
  .editor-container {
    border: 1px solid #999;
  }

  .editor-container :global(.CodeMirror) {
    height: auto;
  }
</style>

<form on:submit|preventDefault={submit}>
  <div class="editor-container" bind:this={editorContainer} />
  <button type="submit">Roll</button>
  {#if error}
    <div>{JSON.stringify(error)}</div>
  {/if}
</form>
