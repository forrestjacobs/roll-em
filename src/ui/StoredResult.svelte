<script lang="ts" context="module">
  import Result from "./Result.svelte";
  import { sum } from "../formula";
  import type { StoredResult } from "../stores";

  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  });

  /*@__PURE__*/
  function getTimeString(date: Date) {
    return timeFormatter.format(date);
  }
</script>

<script lang="ts">
  export let record: StoredResult;

  function scrollIntoView(element: Element) {
    if (record.roll) {
      element.scrollIntoView(false);
    }
  }
</script>

<style>
  .result {
    display: flex;
    align-items: flex-start;
    padding: 0.5em;
  }

  .sum {
    flex-shrink: 0;
    line-height: 2em;
    font-weight: bold;
    background: var(--white);
    padding: 0 0.5em;
    border-radius: 0.125em;
  }

  .equals {
    flex-shrink: 0;
    line-height: 2em;
    padding: 0 0.5em;
    width: 1em;
    text-align: center;
    color: var(--dark);
  }

  .time {
    flex-shrink: 0;
    flex-grow: 1;
    text-align: right;
    padding: 0 1em 0 0.5em;
    color: var(--dark);
  }
</style>

<div class="result" use:scrollIntoView>
  <span class="sum">{sum(record.result)}</span>
  <span class="equals">{" = "}</span>
  <Result result="{record.result}" animated="{record.roll}" />
</div>
{#if record.date}
  <div class="time">{getTimeString(record.date)}</div>
{/if}
