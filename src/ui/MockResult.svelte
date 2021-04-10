<script lang="ts" context="module">
  import type { Result } from "../formula";
</script>

<script lang="ts">
  export let result: Result = [];
  export let animated: boolean;
</script>

{#if animated}*{/if}
{#each result as term}
  [
  {#if term.type === "number"}
    {` ${term.value}`}
  {:else}
    [d{term.sides}:
    {#each term.value as value}{` ${value}`}{/each}
    {" ]"}
  {/if}
  {" ]"}
{/each}
