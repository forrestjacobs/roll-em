<script lang="ts">
  import { tick } from "svelte";
  import { parse, roll } from "../formula";
  import { getResultsStore } from "../stores";

  const resultsStore = getResultsStore();

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
      if (e.message) {
        errorMessage = e.message;
        errorIndex = e.location?.start?.offset;
      } else {
        throw e;
      }
    }
  }

  let classByCharacter: { [char: string]: string } = {};
  function registerClass(name: string, charset: string) {
    for (const c of charset) {
      classByCharacter[c] = name;
    }
  }
  registerClass("num", "0123456789%");
  registerClass("d", "dD");
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
    background: #fff;
    padding: 4px;
    overflow: auto;
  }

  .editor {
    position: relative;
  }

  .formatted-value {
    white-space: pre-wrap;
    font: inherit;
  }

  .formatted-value :global(.num) {
    color: #164;
  }

  .formatted-value :global(.d) {
    color: #708;
  }

  .formatted-value :global(.error-text) {
    box-shadow: inset 0 0 0 #fff, inset 0 -0.125em 0 #900;
  }

  .formatted-value :global(.error-bookmark) {
    position: relative;
    left: -0.2em;
    border: 0.2em solid transparent;
    border-top-width: 0;
    border-bottom-color: #900;
  }

  .editor textarea {
    position: absolute;
    left: 0;
    top: 0;
    font: inherit;
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    resize: none;
    width: 100%;
    height: 100%;
    color: transparent;
    caret-color: #000;
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

<form on:submit|preventDefault="{submit}">
  <div class="row">
    <div class="editor-container">
      <div class="editor">
        <div class="formatted-value">
          {#each textValue as char, i}
            <span
              class="{`${classByCharacter[char]} ${i === errorIndex ? 'error-text' : ''}`}">{char}</span>
          {/each}
          {#if errorIndex === [...textValue].length}
            <span class="error-bookmark"></span>
          {/if}
          {' '}
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
    <div class="error-message">{errorMessage}</div>
  {:else if $resultsStore.groups.length === 0}
    <div class="examples">
      {'Examples: '}
      <button class="show-as-link" on:click="{() => (textValue = 'd20 + 2')}">
        d20 + 2
      </button>
      {' or '}
      <button class="show-as-link" on:click="{() => (textValue = 'd8 + d6')}">
        d8 + d6
      </button>
    </div>
  {/if}
</form>
