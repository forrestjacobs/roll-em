<script>
  import FormulaForm from "./FormulaForm.svelte";
  import Result from "./Result.svelte";
  import { resultsStore } from "./results-store";
</script>

<style>
  :global(body) {
    background: #eee;
    color: #333;
    margin: 0 0.25em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .container {
    margin: 0 auto;
    max-width: 30em;
  }

  h1 {
    margin: 3em 0 0.5em 0;
    font-weight: normal;
    font-size: 1.5em;
  }

  .form-container {
    margin: 0.5em 0;
  }
</style>

<div class="container">

  <h1>Dice</h1>

  <div class="form-container">
    <FormulaForm />
  </div>

  {#each $resultsStore as { result, id } (id)}
    <div>
      <Result {result} />
    </div>
  {/each}

</div>
