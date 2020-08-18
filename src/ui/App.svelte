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

  :global(h2) {
    font-size: 1em;
    margin: 0;
  }

  :global(p) {
    margin: 0;
    font-size: 0.833em;
  }

  .container {
    padding: 2em 0;
    margin: 0 auto;
    max-width: 43.25em;
  }

  .row {
    padding: 1em 1em 0 1em;
  }

  h1 {
    margin: 0;
    font-weight: normal;
    font-size: 1.5em;
  }

  .footer {
    padding: 6em 1em 1em 1em;
    color: #666;
  }
</style>

<div class="container">

  <div class="row">
    <h1>Roll 'Em</h1>
    <p>
      Enter the dice you want to roll using
      <a href="https://en.wikipedia.org/wiki/Dice_notation">dice notation</a>
      and press
      <em>Roll</em>
    </p>
  </div>

  <FormulaForm />

  <ResultList />

  <div class="footer">
    <p>
      <a href="https://github.com/forrestjacobs/roll-em/blob/prod/LICENSE.txt">
        Copyright 2020 Forrest Jacobs
      </a>
    </p>
  </div>

</div>
