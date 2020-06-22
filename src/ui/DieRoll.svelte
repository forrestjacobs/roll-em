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

  onMount(() => {
    if (animated) {
      animate(sides, canvas);
    } else {
      render(sides, canvas);
    }
  });
</script>

<style>
  .container {
    position: relative;
    display: block;
    width: 44px;
    height: 44px;
  }

  canvas,
  .value {
    position: absolute;
  }

  .value {
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
  }
</style>

<span class="container">
  <canvas bind:this={canvas} width="44" height="44" />
  <span class="value">{value}</span>
</span>
