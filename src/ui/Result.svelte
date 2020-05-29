<svelte:options immutable={true} />

<script>

  import { sum } from '../formula';

  export let result = [];

</script>

<style>

.sum {
  font-weight: bold;
}

</style>

{#if result.length === 0}
  (empty)
{/if}
{#each result as term, termIndex}
  {#if term.sign === -1}
    {" -"}
  {:else if termIndex !== 0}
    {" +"}
  {/if}
  <span class="term">
    {#if term.type === "number"}
      {term.value}
    {:else}
      ({term.count}d{term.sides}: {term.value.join(" + ")})
    {/if}
  </span>
{/each}
=
<span class="sum">{sum(result)}</span>
