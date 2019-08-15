<script>
  export let delay = 0;
  export let name = "Krishna";
  let visible = false;
  function setVisible() {
    visible = true;
  }
  let timeoutId;
  function delayedSetVisible() {
    timeoutId = setTimeout(() => setVisible(), delay * 1000);
  }
  delayedSetVisible();
</script>

{#if visible}
  <slot />
{/if}
