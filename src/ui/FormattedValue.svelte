<script lang="ts" context="module">
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
  export let value: string;
  export let errorIndex: number | undefined = undefined;
</script>

<style>
  .formatted-value :global(.num) {
    color: var(--green);
  }

  .formatted-value :global(.d) {
    color: var(--brand);
  }

  .formatted-value :global(.error-text) {
    box-shadow: inset 0 0 0 var(--white), inset 0 -0.125em 0 var(--red);
  }

  .formatted-value .error-bookmark {
    position: relative;
    left: -0.2em;
    border: 0.2em solid transparent;
    border-top-width: 0;
    border-bottom-color: var(--red);
  }
</style>

<span class="formatted-value">
  {#each value as char, i}
    <span
      class="{`${classByCharacter[char] ?? ''} ${
        i === errorIndex ? 'error-text' : ''
      }`}">{char}</span
    >
  {/each}
  {#if errorIndex === [...value].length}
    <span class="error-bookmark"></span>
  {/if}
</span>
