<script lang="ts" context="module">
  import type { ResultsStore } from "../../stores";
  import { getRoomResultsStore } from "../../stores";
  import FormulaForm from "../../ui/FormulaForm.svelte";
  import ResultList from "../../ui/ResultList.svelte";
</script>

<script lang="ts">
  let resultsStore: ResultsStore = getRoomResultsStore();
</script>

<svelte:head>
  <title>Roll 'Em</title>
</svelte:head>

<FormulaForm resultsStore="{resultsStore}" />
<ResultList resultsStore="{resultsStore}" />
