<script lang="ts" context="module">
  import { tick } from "svelte";
  import { parse,roll } from "../formula";
  import { getResultsStore } from "../stores";

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
        errorIndex =
          e.location !== undefined && e.location.start !== undefined
            ? e.location.start.offset
            : undefined;
      } else {
        throw e;
      }
    }
  }
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

  .formatted-value :global(.num) {
    color: var(--green);
  }

  .formatted-value :global(.d) {
    color: var(--brand);
  }

  .formatted-value :global(.error-text) {
    box-shadow: inset 0 0 0 var(--white), inset 0 -0.125em 0 var(--red);
  }

  .formatted-value :global(.error-bookmark) {
    position: relative;
    left: -0.2em;
    border: 0.2em solid transparent;
    border-top-width: 0;
    border-bottom-color: var(--red);
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

  .error-message {
    padding: 0.3em 0;
    font-size: 0.833em;
    color: var(--red);
  }

  .error-message::before {
    content: "⚠️";
    padding-right: 0.25em;
  }

  .examples {
    padding-top: 1em;
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
          {#each textValue as char, i}
            <span
              class="{`${classByCharacter[char]} ${
                i === errorIndex ? 'error-text' : ''
              }`}">{char}</span
            >
          {/each}
          {#if errorIndex === [...textValue].length}
            <span class="error-bookmark"></span>
          {/if}
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
    <div class="error-message">{errorMessage}</div>
  {:else if $resultsStore.groups.length === 0}
    <div class="examples">
      {"Examples: "}
      <button class="show-as-link" on:click="{() => (textValue = 'd20 + 2')}">
        d20 + 2
      </button>
      {" or "}
      <button class="show-as-link" on:click="{() => (textValue = 'd8 + d6')}">
        d8 + d6
      </button>
    </div>
  {/if}
</form>
