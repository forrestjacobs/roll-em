<script>
  import { onMount } from "svelte";
  import { renderDie } from "../3d";

  export let sides;
  export let value;

  let canvas = undefined;

  onMount(() => {
    renderDie(sides, canvas);
  });
</script>

<style>
  .container {
    position: relative;
    display: block;
    width: 32px;
    height: 32px;
  }

  .value {
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>

<span class="container">
  <span class="value">{value}</span>
  <canvas bind:this={canvas} width="32" height="32" />
</span>
