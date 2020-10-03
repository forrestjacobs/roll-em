<script lang="ts">
  export let sides: number;
  export let value: number;
  export let animated: boolean;
</script>

[d{sides}{#if animated}*{/if}:
{value}]
