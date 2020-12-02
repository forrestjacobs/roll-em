<script lang="ts">
  import FormulaForm from "./FormulaForm.svelte";
  import ResultList from "./ResultList.svelte";
</script>

<style>
  :global(:root) {
    --white: #fff;
    --lightest: #eee;
    --light: #bbb;
    --medium: #999;
    --dark: #666;
    --darkest: #222;
    --black: #000;

    --brand: #636;
    --red: #900;
    --green: #164;
  }

  @media (prefers-color-scheme: dark) {
    :global(:root) {
      --white: #000;
      --lightest: #222;
      --light: #444;
      --medium: #999;
      --dark: #ccc;
      --darkest: #eee;
      --black: #fff;

      --brand: #d6d;
      --red: #c65;
      --green: #0a9;
    }
  }

  :global(body) {
    background: var(--lightest);
    color: var(--darkest);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  :global(a) {
    color: var(--brand);
    text-decoration: none;
    border-bottom: 2px solid var(--medium);
  }

  :global(button.show-as-link) {
    background: none !important;
    border: none;
    border-bottom: 2px solid var(--medium);
    padding: 0 !important;
    font-size: 1em;
    font-family: unset;
    color: var(--brand);
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
  }
</style>

<FormulaForm />

<ResultList />
