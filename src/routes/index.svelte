<script lang="ts" context="module">
  import FormulaForm from "../ui/FormulaForm.svelte";
  import ResultList from "../ui/ResultList.svelte";
</script>

<svelte:head>
	<title>Roll 'Em</title>
</svelte:head>

<div class="header">
  <p>
    {"Enter the dice you want to roll using "}
    <a href="https://en.wikipedia.org/wiki/Dice_notation">dice notation</a>
    {" and press "}<em>Roll</em>
  </p>
</div>

<FormulaForm />

<ResultList />
