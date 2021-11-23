<script lang="ts" context="module">
  import { onMount } from "svelte";
  import { animate, getColor, render as renderDie } from "../3d";

  const VALUE_RADIUS = 22;
</script>

<script lang="ts">
  export let sides: number;
  export let value: number;
  export let animated: boolean;

  const canvasRadius = VALUE_RADIUS * (globalThis.devicePixelRatio ?? 1);

  let canvas: HTMLCanvasElement | undefined = undefined;
  let valueEl: HTMLElement | undefined = undefined;

  onMount(() => {
    if (animated) {
      animate(sides, canvasRadius, canvas!, VALUE_RADIUS, valueEl!);
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
  .shadow,
  .value {
    position: absolute;
  }

  .illustration {
    width: 44px;
    height: 44px;
  }

  .shadow {
    display: block;
    left: 6px;
    top: 6px;
    width: 32px;
    height: 32px;
    border-radius: 12px;
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
    text-shadow: 0 -1px 1px rgba(0, 0, 33, 0.25), 1px 0 1px rgba(0, 0, 33, 0.25),
      0 1px 1px rgba(0, 0, 33, 0.25), -1px 0 1px rgba(0, 0, 33, 0.25);
  }
</style>

<span class="container" title="d{sides}">
  {#if typeof window !== "undefined"}
    <canvas
      class="illustration"
      width="{canvasRadius * 2}"
      height="{canvasRadius * 2}"
      aria-hidden="true"
      bind:this="{canvas}"></canvas>
  {:else}
    <span class="shadow" style="background:{getColor(sides)}" aria-hidden="true"
    ></span>
  {/if}
  <span class="value" bind:this="{valueEl}">{value}</span>
</span>
