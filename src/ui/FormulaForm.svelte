<script lang="ts" context="module">
  import type { ResultsStore } from "../stores";
  import { onMount, tick } from "svelte";
  import FormattedValue from "./FormattedValue.svelte";
  import { parse, roll } from "../formula";

  let classByCharacter: { [char: string]: string } = {};
  function registerClass(name: string, charset: string) {
    for (const c of charset) {
      classByCharacter[c] = name;
    }
  }
  registerClass("num", "0123456789%");
  registerClass("d", "dD");
</script>

<script lang="ts">
  export let resultsStore: ResultsStore;

  let input: HTMLTextAreaElement;
  let textValue = "";

  let errorMessage: string | undefined = undefined;
  let errorIndex: number | undefined = undefined;

  function onInputKeydown() {
    errorMessage = undefined;
    errorIndex = undefined;
  }

  function onInputKeypress(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      submit();
      event.preventDefault();
    }
  }

  async function submit() {
    errorMessage = undefined;
    errorIndex = undefined;
    try {
      resultsStore.append(roll(parse(textValue)));

      await tick();
      input.focus();
      input.select();
    } catch (e) {
      if (e instanceof Error) {
        errorMessage = e.message;
        const offset = (e as PegjsError)?.location?.start?.offset;
        errorIndex = typeof offset === "number" ? offset : undefined;
      } else {
        throw e;
      }
    }
  }

  onMount(() => {
    input.focus();
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
    background: var(--white);
    overflow: auto;
    overflow-wrap: break-word;
  }

  .editor {
    position: relative;
  }

  .formatted-value {
    padding: 5px;
    white-space: pre-wrap;
    font: inherit;
  }

  .editor textarea {
    position: absolute;
    left: 0;
    top: 0;
    font: inherit;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid var(--light);
    padding: 4px;
    background: transparent;
    resize: none;
    width: 100%;
    height: 100%;
    color: transparent;
    caret-color: var(--black);
    outline: none;
  }

  .editor textarea:focus {
    border: 2px solid var(--medium);
    padding: 3px;
  }

  form button[type="submit"] {
    border: 0;
    background-color: #636;
    font-size: 1em;
    color: #fff;
    min-width: 8em;
    flex-shrink: 0;
  }

  .instructions,
  .error-message {
    padding: 0.3em 0;
  }

  .error-message {
    color: var(--red);
  }

  .error-message::before {
    content: "⚠️";
    padding-right: 0.25em;
  }

  @media (prefers-color-scheme: dark) {
    .editor-container {
      background: #333;
    }
  }
</style>

<form on:submit|preventDefault="{submit}">
  <div class="row">
    <div class="editor-container">
      <div class="editor">
        <div class="formatted-value" aria-hidden="true">
          <FormattedValue value="{textValue}" errorIndex="{errorIndex}" />
          {" "}
        </div>
        <textarea
          bind:this="{input}"
          bind:value="{textValue}"
          on:keydown="{onInputKeydown}"
          on:keypress="{onInputKeypress}"
          autocorrect="off"
          autocapitalize="no"
          aria-label="Formula"
          spellcheck="{false}"></textarea>
      </div>
    </div>
    <button type="submit">Roll</button>
  </div>
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}{" "}<a href="/help">(Help!)</a>
    </div>
  {:else}
    <div class="instructions">
      Type in your roll using standard D&D notation.{" "}<a href="/help"
        >(What does this mean?)</a
      >
    </div>
  {/if}
</form>
