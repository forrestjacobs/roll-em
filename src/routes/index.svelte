<script lang="ts" context="module">
  import { onDestroy, onMount } from "svelte";
  import type { ClearableResultsStore, ResultsStore } from "../stores";
  import { getPersonalResultsStore } from "../stores";
  import FormulaForm from "../ui/FormulaForm.svelte";
  import LoadingSection from "../ui/LoadingSection.svelte";
  import ResultList from "../ui/ResultList.svelte"; // bad
</script>

<script lang="ts">
  let resultsStore: (ResultsStore & ClearableResultsStore) | undefined;
  onMount(() => {
    resultsStore = getPersonalResultsStore();
  });
  onDestroy(() => {
    resultsStore?.destroy();
  });
</script>

<style>
  .loading-container {
    height: 6.425em;
  }
</style>

<svelte:head>
  <title>Roll 'Em</title>
</svelte:head>

<div class="header">
  <p>
    {"Enter the dice you want to roll using "}
    <a href="https://en.wikipedia.org/wiki/Dice_notation">dice notation</a>
    {" and press "}<em>Roll</em>
  </p>
</div>

{#if resultsStore !== undefined}
  <FormulaForm resultsStore="{resultsStore}" />
  <ResultList resultsStore="{resultsStore}" />
{:else}
  <div class="loading-container">
    <LoadingSection />
  </div>
{/if}
