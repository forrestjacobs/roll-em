<script lang="ts" context="module">
  import { onDestroy, onMount } from "svelte";
  import type { ClearableResultsStore, ResultsStore } from "../stores";
  import { getPersonalResultsStore } from "../stores";
  import FormulaForm from "../ui/FormulaForm.svelte";
  import LoadingSection from "../ui/LoadingSection.svelte";
  import ResultList from "../ui/ResultList.svelte";
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

{#if resultsStore !== undefined}
  <FormulaForm resultsStore="{resultsStore}" />
  <ResultList resultsStore="{resultsStore}" />
{:else}
  <div class="loading-container">
    <LoadingSection />
  </div>
{/if}
