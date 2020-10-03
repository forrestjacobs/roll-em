<script lang="ts">
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

  :global(a) {
    color: #636;
    text-decoration: none;
    border-bottom: 2px solid #999;
  }

  :global(button.show-as-link) {
    background: none !important;
    border: none;
    border-bottom: 2px solid #999;
    padding: 0 !important;
    font-size: 1em;
    font-family: unset;
    color: #636;
    cursor: pointer;
  }

  :global(p) {
    margin: 0;
  }

  :global(.body-container) {
    padding: 2em 0;
    margin: 0 auto;
    max-width: 43.25em;
  }

  :global(.header) {
    padding: 1em 1em 0 1em;
  }

  :global(h1),
  :global(h2) {
    margin: 0;
    font-weight: normal;
    font-size: 1.5em;
  }

  :global(.footer) {
    padding: 6em 1em 1em 1em;
    color: #666;
  }
</style>

<FormulaForm />

<ResultList />
