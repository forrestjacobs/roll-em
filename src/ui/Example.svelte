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
</script>

<style>
  .type {
    padding: 0.5em 0.75em;
  }

  .value {
    background: var(--white);
    padding: 0.25em;
  }

  .result {
    padding: 0.5em 1em 0.5em 0;
  }

  .caption {
    padding: 0 1em 1em 1em;
    border-bottom: 1px solid var(--light);
  }
</style>

<tr>
  <td class="type">
    <span class="value">
      <FormattedValue value="{value}" />
    </span>
  </td>
  <td class="result">
    <Result result="{roll(parse(value), maxRoller)}" animated="{false}" />
  </td>
</tr>
<tr>
  <td colspan="2" class="caption">
    <slot />
  </td>
</tr>
