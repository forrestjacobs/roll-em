<script>
  import Result from "./Result.svelte";
  import { resultsStore } from "./results-store";
</script>

<style>
  ol {
    margin: 0;
    padding: 1em 0;
    border-bottom: 1px solid #ccc;
  }

  li {
    border-top: 1px solid #ccc;
    list-style: none;
  }

  .clear-row {
    padding: 1em;
  }
</style>

<ol>
  {#each $resultsStore as { result, id } (id)}
    <li>
      <Result {result} />
    </li>
  {/each}
</ol>

{#if $resultsStore.length !== 0}
<div class="clear-row">
  <button on:click={resultsStore.clear}>Clear History</button>
</div>
{/if}
