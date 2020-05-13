<script>

  import parser from './formula-parser.pegjs';

  let formulaString = "";

</script>

<h1>Dice</h1>

<form on:submit|preventDefault={() => alert(JSON.stringify(parser.parse(formulaString)))}>
  <input type="text" bind:value={formulaString} id="formula-input" required placeholder="2d6 + 1d8 + 3" aria-label="Formula" />
  <button type="submit">Roll</button>
</form>
