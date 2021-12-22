<script lang="ts" context="module">
  import Breadcrumbs from "../ui/Breadcrumbs.svelte";
  import Example from "../ui/Example.svelte";
  import FormattedValue from "../ui/FormattedValue.svelte";
</script>

<style>
  table {
    border-collapse: collapse;
    margin: 1em 0;
    min-width: 100%;
  }

  th {
    text-align: left;
    padding: 0.25em 1em;
  }

  .header {
    padding: 1em 1em 0 1em;
  }
</style>

<svelte:head>
  <title>Help - Roll 'Em</title>
</svelte:head>

<Breadcrumbs
  path="{[
    { href: '/', name: 'Home' },
    { href: '/help', name: 'Help' },
  ]}"
/>

<div class="header">
  <h2>What can I type to roll dice?</h2>
</div>

<table>
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Result</th>
    </tr>
  </thead>
  <Example value="d6 + 2">Rolls a six-sided die and adds two</Example>
  <Example value="2d8">Rolls two eight-sided dice</Example>
  <Example value="d6 + d8">Rolls a six and eight-sided die</Example>
  <Example
    value="5d6d2"
    result="{[
      {
        type: 'roll',
        count: 5,
        sides: 6,
        dropLowest: 2,
        value: [5, 3, 6, 2, 3],
        droppedIndexes: [1, 3],
      },
    ]}"
  >
    Rolls five six-sided dice and drops the lowest two
  </Example>
  <Example value="d4 + d6 + d8 + d10 + d12 + d20">
    Rolls standard D&D dice
  </Example>
  <Example value="d100 + d%">
    Both
    {" "}<FormattedValue value="d100" />{" "}
    and
    {" "}<FormattedValue value="d%" />{" "}
    roll 100-sided dice.
  </Example>
</table>
