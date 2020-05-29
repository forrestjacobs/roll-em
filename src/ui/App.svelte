<script>
  import FormulaForm from "./FormulaForm.svelte";
  import Result from "./Result.svelte";
  import { resultsStore } from "./results-store";
</script>

<h1>Dice</h1>

<FormulaForm />

{#each $resultsStore as { result, id } (id)}
  <div>
    <Result {result} />
  </div>
{/each}
