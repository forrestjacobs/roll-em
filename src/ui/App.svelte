<script>

  import { parse, roll } from '../formula';
  import Result from './Result.svelte';

  let formulaString = "";

  let result = undefined;
  let formulaError = undefined;

  function submit() {
    try {
      let formula = parse(formulaString);
      result = roll(formula);
      formulaError = undefined;
    } catch (error) {
      result = undefined;
      formulaError = error;
    }
  }

</script>

<h1>Dice</h1>

<form on:submit|preventDefault={submit}>
  <input type="text" bind:value={formulaString} id="formula-input" required placeholder="2d6 + 1d8 + 3" aria-label="Formula" />
  <button type="submit">Roll</button>
  {#if formulaError}
    <div>{ JSON.stringify(formulaError) }</div>
  {/if}
</form>

{#if result}
  <Result result={result} />
{/if}
