<script lang="ts">
  import { getResultsStore, ResultSource, ResultsStoreState } from "../stores";
  import type { GroupedResults } from "../stores/results-store";
  import Result from "./Result.svelte";

  const resultsStore = getResultsStore();

  function getIndex(group: GroupedResults) {
    return group.day?.getTime();
  }

  function getDayString(day: Date | undefined) {
    return day?.toLocaleDateString() ?? "Earlier";
  }
</script>

<style>
  .results-header {
    padding: 1em 1em 0 1em;
  }

  .results-header h2 {
    margin-right: 1em;
    display: inline;
  }

  ol.results {
    margin: 0;
    padding: 0;
  }

  ol.results > li {
    list-style: none;
  }

  .day {
    background: #eee;
    color: #000;
    padding: 1em 1em 0.25em 1em;
    position: sticky;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid #ccc;
  }

  ol.group-results {
    margin: 0;
    padding: 0;
  }

  ol.group-results > li {
    border-bottom: 1px solid #ccc;
    list-style: none;
    display: flex;
    align-items: flex-start;
  }

  .row {
    padding: 1em;
  }
</style>

{#if $resultsStore.groups.length !== 0 || $resultsStore.state !== ResultsStoreState.HAS_NO_MORE}
  <div class="results-header">
    <h2>Results</h2>
    <button class="show-as-link" on:click={resultsStore.clear}>Clear</button>
  </div>
{/if}

{#if $resultsStore.groups.length !== 0}
  <ol class="results">
    {#each $resultsStore.groups as group (getIndex(group))}
      <li>
        <div class="day">{getDayString(group.day)}</div>
        <ol class="group-results">
          {#each group.results as { index, date, source, result } (index)}
            <li>
              <Result {result} {date} animated={source === ResultSource.USER} />
            </li>
          {/each}
        </ol>
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
