<script lang="ts">
  import Result from "./Result.svelte";
  import { resultsStore } from "../stores";
  import { ResultSource, ResultsStoreState } from "../stores/results-store";
</script>

<style>
  .results-header {
    padding: 1em 1em 0 1em;
  }

  .results-header h2 {
    margin: 0 1em 0 0;
    font-weight: normal;
    font-size: 1.5em;
    display: inline;
  }

  ol {
    margin: 0;
    padding: 1em 0;
  }

  li {
    border-bottom: 1px solid #ccc;
    list-style: none;
  }

  .row {
    padding: 1em;
  }
</style>

{#if $resultsStore.results.length !== 0 || $resultsStore.state !== ResultsStoreState.HAS_NO_MORE}
  <div class="results-header">
    <h2>Results</h2>
    <button class="show-as-link" on:click={resultsStore.clear}>Clear</button>
  </div>
{/if}

{#if $resultsStore.results.length !== 0}
  <ol>
    {#each $resultsStore.results as { index, source, result } (index)}
      <li>
        <Result {result} animated={source === ResultSource.USER} />
      </li>
    {/each}
  </ol>
{/if}

{#if $resultsStore.state === ResultsStoreState.HAS_MORE}
  <div class="row">
    <button class="show-as-link" on:click={resultsStore.loadMore}>
      Load More
    </button>
  </div>
{/if}

{#if $resultsStore.state === ResultsStoreState.LOADING}
  <div class="row">Loading...</div>
{/if}
