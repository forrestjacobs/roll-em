<script lang="ts" context="module">
  import { onMount } from "svelte";
  import FormulaForm from "../ui/FormulaForm.svelte";
  import LoadingSection from "../ui/LoadingSection.svelte";
  import ResultList from "../ui/ResultList.svelte";
</script>

<script>
  let mounted = false;
  onMount(() => {
    mounted = true;
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

{#if mounted}
  <FormulaForm />
  <ResultList />
{:else}
  <div class="loading-container">
    <LoadingSection />
  </div>
{/if}
