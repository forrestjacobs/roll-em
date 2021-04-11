<style>
  .loading {
    padding: 1em;
    box-sizing: border-box;
    height: 100%;
  }

  .short.line {
    width: 50%;
  }

  .line {
    width: 90%;
    height: 20%;
    margin-bottom: 2%;
    border-radius: 999px;
    background: linear-gradient(270deg, var(--light), var(--lightest));
    background-size: 400% 400%;
    animation: Pulse 3s ease-in-out infinite alternate;
  }

  @keyframes Pulse {
    0%{background-position:0% 50%}
    100%{background-position:100% 50%}
  }
</style>

<div class="loading" aria-label="Loading...">
  <div class="short line"></div>
  <div class="line"></div>
  <div class="line"></div>
</div>
