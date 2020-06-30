<script context="module">
  let animated = false;

  setTimeout(() => {
    animated = true;
  }, 0);
</script>

<script>
  import { onMount } from "svelte";
  import { animate, render } from "../3d";

  export let sides;
  export let value;

  let canvas = undefined;
  let valueEl = undefined;

  onMount(() => {
    if (animated) {
      animate(sides, canvas, valueEl);
    } else {
      render(sides, canvas, valueEl);
    }
  });
</script>

<style>
  .container {
    position: relative;
    display: block;
    width: 44px;
    height: 44px;
    overflow: hidden;
  }

  canvas,
  .value {
    position: absolute;
  }

  .value {
    display: block;
    left: 6px;
    top: 6px;
    text-align: center;
    width: 32px;
    height: 32px;
    line-height: 32px;
    overflow: hidden;
  }
</style>

<span class="container">
  <canvas bind:this={canvas} width="44" height="44" />
  <span class="value" bind:this={valueEl}>{value}</span>
</span>
