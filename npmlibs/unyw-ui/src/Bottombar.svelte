<script>
  export let tabs = {}
  export let active = ''
</script>

<div class="unywui-bottombar">
  <div class="container">
    {#each Object.keys(tabs) as tab}
    <div class:active={tab == active} on:click={() => active = tab}>
      <i class={tabs[tab].icon}/>
      <p>{tabs[tab].label}</p>
    </div>
    {/each}
  </div>
</div>

<style>
  div.unywui-bottombar {
    user-select: none;
    cursor: pointer;
    text-align: center;
    display:flex;
    height: 56px;
    width: 100%;
    box-shadow: 0px -1px 14px 5px rgba(0,0,0,0.4);
    background-color: var(--color-navbar-backgroud, var(--color-primary, #000));
    color: var(--color-navbar-text, #fff);
  }

  .container {
    width: 100%;
    max-width: 500px;
    margin:  0 auto;
    display:flex;
  }
  
  div.unywui-bottombar > div > div {
    flex: 1 1 0;
    height: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 60%;
    transition: background-color 0.05s ease;
  }

  div.unywui-bottombar > div > div:active {
    opacity: 100%;
    background-color: #00000050;
  }
  

  div.unywui-bottombar > div > div.active {
    opacity: 100%;
  }

  i {
    margin: 0px;
    font-size: 18.5px;
  }
  p {
    margin: 0;
    font-size: 13px;
  }

  .active i {
    margin: 0px;
    font-size: 22.5px;
  }
  .active p {
    font-size: 15px;
  }

</style>