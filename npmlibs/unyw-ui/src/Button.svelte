<script>
  export let type = 'default'
</script>

<button class={`uniw-button unyw-button-${ type || 'default'}`}>
  ciao
</button>

<style>
  button {
    margin: 0px;
    padding: 10px 20px;

  }

  button.unyw-button-round {
    border-radius: 20px;
  }
</style>