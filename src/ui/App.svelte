<script>
  import FormulaForm from "./FormulaForm.svelte";
  import ResultList from "./ResultList.svelte";
</script>

<style>
  :global(body) {
    background: #eee;
    color: #333;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .container {
    padding: 3em 0;
    margin: 0 auto;
    max-width: 43.25em;
  }

  h1 {
    margin: 0;
    padding: 0 0.667em;
    font-weight: normal;
    font-size: 1.5em;
  }
</style>

<div class="container">

  <h1>Dice</h1>

  <FormulaForm />

  <ResultList />

</div>
