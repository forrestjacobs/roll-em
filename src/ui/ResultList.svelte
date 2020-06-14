<script>
  import Result from "./Result.svelte";
  import { resultsStore } from "./results-store";
</script>

<style>
  ol {
    margin: 0;
    padding: 1em 0;
  }

  li {
    border-top: 1px solid #ccc;
    list-style: none;
  }
</style>

<ol>
  {#each $resultsStore as { result, id } (id)}
    <li>
      <Result {result} />
    </li>
  {/each}
</ol>
