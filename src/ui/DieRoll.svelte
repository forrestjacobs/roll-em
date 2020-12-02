<script lang="ts">
  import { onMount } from "svelte";
  import { animate, render as renderDie } from "../3d";

  export let sides: number;
  export let value: number;
  export let animated: boolean;

  const scale = window.devicePixelRatio || 1;

  const valueRadius = 22;
  const canvasRadius = valueRadius * scale;

  let canvas: HTMLCanvasElement | undefined = undefined;
  let valueEl: HTMLElement | undefined = undefined;

  onMount(() => {
    if (animated) {
      animate(sides, canvasRadius, canvas!, valueRadius, valueEl!);
    } else {
      renderDie(sides, canvasRadius, canvas!);
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

  .illustration,
  .value {
    position: absolute;
  }

  .illustration {
    width: 44px;
    height: 44px;
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

<span class="container" title="d{sides}">
  <canvas
    class="illustration"
    width="{canvasRadius * 2}"
    height="{canvasRadius * 2}"
    aria-hidden="true"
    bind:this="{canvas}"></canvas>
  <span class="value" bind:this="{valueEl}">{value}</span>
</span>
