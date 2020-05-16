<script>

  import Result from './Result.svelte';
  import parser from './formula-parser.pegjs';
  import { roll } from './roll.ts';

  let formulaString = "";

  let result = undefined;
  let formulaError = undefined;

  function parse() {
    try {
      let formula = parser.parse(formulaString);
      result = roll(formula);
      formulaError = undefined;
    } catch (error) {
      result = undefined;
      formulaError = error;
    }
  }

</script>

<h1>Dice</h1>

<form on:submit|preventDefault={parse}>
  <input type="text" bind:value={formulaString} id="formula-input" required placeholder="2d6 + 1d8 + 3" aria-label="Formula" />
  <button type="submit">Roll</button>
  {#if formulaError}
    <div>{ JSON.stringify(formulaError) }</div>
  {/if}
</form>

{#if result}
  <Result result={result} />
{/if}
