<script>
  export let name = "Krishna";
  export let delay = 0;
  import DelayedComponent from "./DelayedComponent.svelte";
</script>

<DelayedComponent {delay}>
  <span>{name}</span>
</DelayedComponent>
