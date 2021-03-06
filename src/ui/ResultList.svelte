<script lang="ts" context="module">
  import type {
    ClearableResultsStore,
    GroupedResults,
    ResultsStore,
  } from "../stores";
  import { RESULTS_STORE_HAS_MORE } from "../stores";
  import Result from "./Result.svelte";

  const dateFormatter = new Intl.DateTimeFormat([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  });

  /*@__PURE__*/
  function getIndex(group: GroupedResults): number {
    const day = group.day;
    return day === undefined ? -1 : day.getTime();
  }

  /*@__PURE__*/
  function getDayString(date: Date | undefined) {
    return date === undefined ? "Earlier" : dateFormatter.format(date);
  }

  /*@__PURE__*/
  function getTimeString(date: Date) {
    return timeFormatter.format(date);
  }
</script>

<script lang="ts">
  export let resultsStore: ResultsStore & Partial<ClearableResultsStore>;
</script>

<style>
  .results-header {
    padding: 1em 1em 0 1em;
  }

  .results-header h2 {
    margin-right: 1em;
    display: inline;
  }

  h3 {
    background: var(--lightest);
    color: var(--dark);
    padding: 1em 1em 0.25em 1em;
    margin: 0;
    font-weight: normal;
    font-size: 1em;
    position: sticky;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid var(--light);
  }

  ol {
    margin: 0;
    padding: 0;
  }

  ol > li {
    border-bottom: 1px solid var(--light);
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    padding: 0.5em;
  }

  .time {
    flex-shrink: 0;
    flex-grow: 1;
    text-align: right;
    padding: 0 1em 0 0.5em;
    color: var(--dark);
  }

  .load-more {
    margin: 1em;
  }
</style>

{#if $resultsStore.groups.length !== 0}
  <div class="results-header">
    <h2>Results</h2>
    {#if resultsStore.clear !== undefined}
      <button class="show-as-link" on:click="{resultsStore.clear}">Clear</button
      >
    {/if}
  </div>

  {#each $resultsStore.groups as group (getIndex(group))}
    <h3>{getDayString(group.day)}</h3>
    <ol>
      {#each group.results as { key, date, roll, result } (key)}
        <li>
          <Result result="{result}" animated="{roll}" />
          {#if date}
            <div class="time">{getTimeString(date)}</div>
          {/if}
        </li>
      {/each}
    </ol>
  {/each}
{/if}

{#if $resultsStore.state === RESULTS_STORE_HAS_MORE}
  <button class="show-as-link load-more" on:click="{resultsStore.loadMore}">
    Load More
  </button>
{/if}
