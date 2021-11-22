<script lang="ts" context="module">
  type CharClass = "num" | "d";
  let classByCharacter: { [char: string]: CharClass } = {};
  function registerClass(name: CharClass, charset: string) {
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
  .num {
    color: var(--green);
  }

  .d {
    color: var(--brand);
  }

  .error-text {
    box-shadow: inset 0 0 0 var(--white), inset 0 -0.125em 0 var(--red);
  }

  .error-bookmark {
    position: relative;
    left: -0.2em;
    border: 0.2em solid transparent;
    border-top-width: 0;
    border-bottom-color: var(--red);
  }
</style>

{#each value as char, i}
  <span
    class:error-text="{i === errorIndex}"
    class:num="{classByCharacter[char] === 'num'}"
    class:d="{classByCharacter[char] === 'd'}">{char}</span
  >
{/each}
{#if errorIndex === [...value].length}
  <span class="error-bookmark"></span>
{/if}
