<script>
  import { parse, roll } from "../formula";
  import { resultsStore } from "./results-store";

  let value = "";
  let error = undefined;

  function submit() {
    try {
      resultsStore.append(roll(parse(value)));
    } catch (e) {
      error = e;
    }
  }
</script>

<form on:submit|preventDefault={submit}>
  <input
    type="text"
    bind:value
    required
    placeholder="2d6 + 1d8 + 3"
    aria-label="Formula" />
  <button type="submit">Roll</button>
  {#if error}
    <div>{JSON.stringify(error)}</div>
  {/if}
</form>
