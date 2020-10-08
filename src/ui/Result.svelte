<script lang="ts" context="module">
  const MAX_DICE_TO_SHOW_PER_TERM = 15;
</script>

<script lang="ts">
  import { sum, Result } from "../formula";
  import DieRoll from "./DieRoll.svelte";

  export let result: Result = [];
  export let date: Date | undefined;
  export let animated: boolean;
</script>

<style>
  .result {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 1em;
  }

  .sum {
    flex-shrink: 0;
    line-height: 2em;
    font-weight: bold;
    background: #fff;
    padding: 0 0.5em;
    border-radius: 0.125em;
  }

  .equals {
    flex-shrink: 0;
    line-height: 2em;
    padding: 0 0.5em;
    width: 1em;
    text-align: center;
    color: #ccc;
  }

  .components {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    margin: -0.375em;
  }

  .time {
    flex-shrink: 0;
    line-height: 2em;
    padding: 0 0.5em;
    color: #999;
  }

  .operator,
  .number,
  .overflow,
  .dice {
    line-height: 2.75em;
  }

  .operator,
  .number {
    margin: 0 0.375em;
  }

  .overflow {
    font-style: italic;
    margin-right: 0.375em;
  }

  .dice-operator {
    display: none;
  }
</style>

<svelte:options immutable={true} />

<div class="result">
  <span class="sum">{sum(result)}</span>
  <span class="equals">=</span>
  <span class="components">
    {#if result.length === 0}<span class="empty">(empty)</span>{/if}

    {#each result as term, termIndex}
      {#if termIndex != 0}{' '}{/if}

      {#if term.type === 'number' && term.value < 0}
        <span class="operator term-operator">-</span>
      {:else if termIndex !== 0}
        <span class="operator term-operator">+</span>
      {/if}

      {#if term.type === 'number'}
        <span class="number">{Math.abs(term.value)}</span>
      {:else}
        {#each term.value as value, valueIndex}
          {#if valueIndex < MAX_DICE_TO_SHOW_PER_TERM}
            {#if valueIndex !== 0}
              {' '}
              <span class="operator dice-operator">+</span>
            {/if}
            <span class="dice" title="d{term.sides}">
              <DieRoll sides={term.sides} {value} {animated} />
            </span>
          {:else if valueIndex === MAX_DICE_TO_SHOW_PER_TERM}
            {' '}
            <span class="operator overflow-operator">+</span>
            <span class="overflow">
              {term.value.length - MAX_DICE_TO_SHOW_PER_TERM}
              more
            </span>
          {/if}
        {/each}
      {/if}
    {/each}
  </span>
  {#if date}<span class="time"> {date.toLocaleTimeString()} </span>{/if}
</div>
