<script>

  import { sum } from './sum.ts';

  export let result = [];

</script>

<style>

.sum {
  font-weight: bold;
}

</style>

{#each result as term, termIndex}
  <span class="term">
    {term.sign === -1 ? "-" : termIndex === 0 ? "" : "+"}
    {#if term.type === "number"}
      {term.value}
    {:else}
      ({term.count}d{term.sides}: {term.value.join(" + ")})
    {/if}
  </span>
{/each}
=
<span class="sum">{sum(result)}</span>
