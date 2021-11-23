<script lang="ts" context="module">
  interface Item {
    href: string;
    name: string;
  }
</script>

<script lang="ts">
  export let path: Array<Item>;
</script>

<style>
  ol {
    margin: 1em;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline;
  }

  li+li:before {
    content: "\2192";
    margin: 0 0.5em;
  }
</style>

<nav aria-label="breadcrumbs">
  <ol>
    {#each path as { href, name }, i}
      <li>
        <a
          href="{href}"
          aria-current="{i === path.length - 1 ? 'location' : undefined}"
          >{name}</a
        >
      </li>
    {/each}
  </ol>
</nav>
