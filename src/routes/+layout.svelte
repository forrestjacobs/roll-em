<script lang="ts" context="module">
  import { page } from "$app/stores";
  import "./styles.css";
</script>

<h1>
  <a
    href="/"
    aria-current="{$page.url.pathname === '/' ? 'location' : undefined}"
  >
    <img src="/logo.svg" alt="" width="44" height="44" />
    {" "}
    Roll 'Em
  </a>
</h1>

<slot />

<div class="footer">
  <p>
    <a href="https://github.com/forrestjacobs/roll-em/blob/prod/LICENSE.txt"
      >Copyright 2020–{process.env.BUILD_YEAR} Forrest Jacobs</a
    >
  </p>
</div>
