<script lang="ts" context="module">
  let animated = false;

  setTimeout(() => {
    animated = true;
  }, 0);
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { animate, render as renderDie } from "../3d";

  export let sides: number;
  export let value: number;

  let canvas: HTMLCanvasElement | undefined = undefined;
  let valueEl: HTMLElement | undefined = undefined;

  onMount(() => {
    if (animated) {
      animate(sides, canvas!, valueEl!);
    } else {
      renderDie(sides, canvas!, valueEl!);
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
    line-height: 30px;
    overflow: hidden;
    color: #fff;
    font-weight: 600;
    text-shadow: 0 -1px 1px rgba(0, 0, 33, 0.25);
  }
</style>

<span class="container">
  <canvas bind:this={canvas} width="44" height="44" />
  <span class="value" bind:this={valueEl}>{value}</span>
</span>
