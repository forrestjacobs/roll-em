<script lang="ts" context="module">
  import Result from "./Result.svelte";
  import FormattedValue from "./FormattedValue.svelte";
  import { parse, roll } from "../formula";

  function maxRoller(sides: number): number {
    return sides;
  }
</script>

<script lang="ts">
  export let value: string;
  export let result = roll(parse(value), maxRoller);
</script>

<style>
  .type {
    padding: 0.5em;
  }

  .value {
    background: var(--white);
    display: inline-block;
    line-height: 2em;
    font-weight: bold;
    background: var(--white);
    padding: 0 0.5em;
    border-radius: 0.125em;
  }

  .result {
    padding: 1em;
  }

  .caption {
    padding: 0 1em 1em 1em;
    border-bottom: 1px solid var(--light);
  }
</style>

<tr>
  <td class="type">
    <div class="value">
      <FormattedValue value="{value}" />
    </div>
  </td>
  <td class="result">
    <Result result="{result}" animated="{false}" />
  </td>
</tr>
<tr>
  <td colspan="2" class="caption">
    <slot />
  </td>
</tr>
