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
  }

  .equals {
    flex-shrink: 0;
    padding: 0 0.5em;
  }

  .sum {
    flex-shrink: 0;
    min-width: 8em;
    font-weight: bold;
  }
</style>

<svelte:options immutable={true} />

<div class="result">
  <span class="components">
    {#if result.length === 0}(empty){/if}
    {#each result as term, termIndex}
      {#if term.sign === -1}{' -'}{:else if termIndex !== 0}{' +'}{/if}
      <span class="term">
        {#if term.type === 'number'}
          {term.value}
        {:else}({term.count}d{term.sides}: {term.value.join(' + ')}){/if}
      </span>
    {/each}
  </span>
  <span class="equals">=</span>
  <span class="sum">{sum(result)}</span>
</div>
