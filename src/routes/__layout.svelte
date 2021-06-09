<style global>
  :root {
    --white: #fff;
    --lightest: #eee;
    --light: #bbb;
    --medium: #999;
    --dark: #666;
    --darkest: #222;
    --black: #000;

    --brand: #636;
    --red: #900;
    --green: #164;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --white: #000;
      --lightest: #222;
      --light: #444;
      --medium: #999;
      --dark: #ccc;
      --darkest: #eee;
      --black: #fff;

      --brand: #d6d;
      --red: #c65;
      --green: #0a9;
    }
  }

  body {
    background: var(--lightest);
    color: var(--darkest);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  a {
    color: var(--brand);
    text-decoration: none;
    border-bottom: 2px solid var(--medium);
  }

  button.show-as-link {
    background: none !important;
    border: none;
    border-bottom: 2px solid var(--medium);
    padding: 0 !important;
    font-size: 1em;
    font-family: unset;
    color: var(--brand);
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  #app {
    padding: 2em 0;
    margin: 0 auto;
    max-width: 43.25em;
  }

  .header {
    padding: 0 1em;
  }

  h1 {
    margin: 0.6667em 0.6667em 0 0.6667em;
  }

  h2 {
    margin: 0;
  }

  h1,
  h2 {
    font-weight: normal;
    font-size: 1.5em;
  }

  .footer {
    padding: 6em 1em 1em 1em;
  }
</style>

<h1>Roll 'Em</h1>

<slot />

<div class="footer">
  <p>
    <a href="https://github.com/forrestjacobs/roll-em/blob/prod/LICENSE.txt"
      >Copyright 2020–{process.env.BUILD_YEAR} Forrest Jacobs</a
    >
  </p>
</div>
