<script>

  import parser from './formula-parser.pegjs';
  import { roll } from './roll.ts';
  import { sum } from './sum.ts';

  let formulaString = "";
  let formula = [];

  function parse() {
    formula = parser.parse(formulaString);
  }

</script>

<h1>Dice</h1>

<form on:submit|preventDefault={parse}>
  <input type="text" bind:value={formulaString} id="formula-input" required placeholder="2d6 + 1d8 + 3" aria-label="Formula" />
  <button type="submit">Roll</button>
</form>

<div>
  { sum(roll(formula)) }
</div>
