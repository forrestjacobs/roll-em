<script lang="ts">
  export let sides: number;
  export let value: number;
  export let animated: boolean;
  export let drop: boolean;
</script>

{#if drop}~{/if}
[d{sides}{#if animated}*{/if}:
{value}]
