<script lang="ts" context="module">
  import type { Result, ResultTerm, RollTerm, RollValue } from "../formula";
  import { rollValues } from "../formula";
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

  function rollIter(term: RollTerm): RollValue[] {
    let index = 0;
    let result: RollValue[] = [];

    for (const value of rollValues(term)) {
      result.push(value);
      index++;
      if (index === MAX_DICE_TO_SHOW_PER_TERM) {
        break;
      }
    }

    return result;
  }
</script>

<script lang="ts">
  export let result: Result;
  export let animated: boolean;
</script>

<style>
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

<span class="components">
  {#each result as term, termIndex}
    {#if getTermOp(term, termIndex) !== undefined}
      <span class="operator">{` ${getTermOp(term, termIndex)} `}</span>
    {/if}

    {#if term.type === "number"}
      <span class="number">{Math.abs(term.value)}</span>
    {:else}
      {#each rollIter(term) as { value, drop }, rollIndex}
        {#if rollIndex !== 0}<span class="dice-operator">{" + "}</span>{/if}
        <DieRoll
          sides="{term.sides}"
          value="{value}"
          animated="{animated}"
          drop="{drop}"
        />
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
