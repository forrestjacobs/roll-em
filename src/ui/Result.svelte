<script>
  import { sum } from "../formula";

  export let result = [];
</script>

<style>
  .result {
    display: flex;
    padding: 1em;
  }

  .components {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    margin: -0.375em;
  }

  .operator, .term {
    line-height: 2em;
    text-align: center;
    margin: 0.375em;
  }

  .term.dice {
    width: 2em;
    border-radius: 50%;
    background: #FFF;
  }

  .dice-operator {
    display: none;
  }

  .equals {
    flex-shrink: 0;
    line-height: 2em;
    padding: 0 0.5em;
  }

  .sum {
    flex-shrink: 0;
    line-height: 2em;
    min-width: 8em;
    font-weight: bold;
  }
</style>

<svelte:options immutable={true} />

<div class="result">
  <span class="components">
    {#if result.length === 0}
      <span class="empty">(empty)</span>
    {/if}

    {#each result as term, termIndex}
      {#if termIndex != 0}{' '}{/if}

      {#if term.type === 'number' && term.value < 0}
        <span class="operator term-operator">-</span>
      {:else if termIndex !== 0}
        <span class="operator term-operator">+</span>
      {/if}

      {#if term.type === 'number'}
        <span class="term number">{Math.abs(term.value)}</span>
      {:else}
        {#each term.value as value, valueIndex}
          {#if valueIndex !== 0}
            {' '}
            <span class="operator dice-operator">+</span>
          {/if}
          <span class="term dice d{term.sides}" title="d{term.sides}">
            {value}
          </span>
        {/each}
      {/if}
    {/each}
  </span>
  <span class="equals">=</span>
  <span class="sum">{sum(result)}</span>
</div>
