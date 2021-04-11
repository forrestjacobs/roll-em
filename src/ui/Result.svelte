<script lang="ts" context="module">
  import type { Result, ResultTerm } from "../formula";
  import { sum } from "../formula";
  import DieRoll from "./DieRoll.svelte";

  const MAX_DICE_TO_SHOW_PER_TERM = 15;

  /*@__PURE__*/
  function getTermOp(term: ResultTerm, termIndex: number) {
    return term.type === "number" && term.value < 0
      ? "-"
      : termIndex === 0
      ? undefined
      : "+";
  }
</script>

<script lang="ts">
  export let result: Result;
  export let animated: boolean;
</script>

<style>
  .result {
    display: flex;
    align-items: flex-start;
    padding: 0.5em;
  }

  .sum {
    flex-shrink: 0;
    line-height: 2em;
    font-weight: bold;
    background: var(--white);
    padding: 0 0.5em;
    border-radius: 0.125em;
  }

  .equals {
    flex-shrink: 0;
    line-height: 2em;
    padding: 0 0.5em;
    width: 1em;
    text-align: center;
    color: var(--dark);
  }

  .components {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    margin: -0.375em;
    line-height: 2.75em;
  }

  .operator {
    font-style: normal;
  }

  .operator,
  .number {
    margin: 0 0.375em;
  }

  .overflow {
    font-style: italic;
  }

  .dice-operator {
    display: none;
  }
</style>

<svelte:options immutable="{true}" />

<div class="result">
  <span class="sum">{sum(result)}</span>
  <span class="equals">{" = "}</span>
  <span class="components">
    {#each result as term, termIndex}
      {#if getTermOp(term, termIndex) !== undefined}
        <span class="operator">{` ${getTermOp(term, termIndex)} `}</span>
      {/if}

      {#if term.type === "number"}
        <span class="number">{Math.abs(term.value)}</span>
      {:else}
        {#each term.value.slice(0, MAX_DICE_TO_SHOW_PER_TERM) as value, valueIndex}
          {#if valueIndex !== 0}<span class="dice-operator">{" + "}</span>{/if}
          <DieRoll sides="{term.sides}" value="{value}" animated="{animated}" />
        {/each}
        {#if term.value.length > MAX_DICE_TO_SHOW_PER_TERM}
          <span class="overflow">
            <span class="operator">{" + "}</span>
            {term.value.length - MAX_DICE_TO_SHOW_PER_TERM}
            more
          </span>
        {/if}
      {/if}
    {/each}
  </span>
</div>
