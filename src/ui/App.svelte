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

  :global(button.show-as-link) {
    background: none !important;
    border: none;
    border-bottom: 2px solid #999;
    padding: 0! important;
    font-size: 1em;
    font-family: unset;
    color: #94a;
    cursor: pointer;
  }

  :global(h2) {
    font-size: 1em;
    margin: 0;
  }

  :global(p) {
    margin: 0;
    font-size: 0.833em;
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
