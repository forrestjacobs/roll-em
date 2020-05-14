<script>

  import parser from './formula-parser.pegjs';
  import { roll } from './roll.ts';
  import { sum } from './sum.ts';

  let formulaString = "";

  let result = [];
  let formulaError = undefined;

  function parse() {
    let formula = [];
    try {
      formula = parser.parse(formulaString);
      formulaError = undefined;
    } catch (error) {
      formulaError = error;
    }
    result = roll(formula);
  }

</script>

<h1>Dice</h1>

<form on:submit|preventDefault={parse}>
  <input type="text" bind:value={formulaString} id="formula-input" required placeholder="2d6 + 1d8 + 3" aria-label="Formula" />
  <button type="submit">Roll</button>
</form>

<div>
  Result: { JSON.stringify(result) }
</div>

<div>
  Sum: { sum(result) }
</div>

<div>
  { JSON.stringify(formulaError) }
</div>
