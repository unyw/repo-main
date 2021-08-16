<script>
</script>

<div class="unywui-topbar">
  <div class="container">
    <slot></slot>
  </div>
</div>

<style>
  div.unywui-topbar {
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    text-align: center;
    display:flex;
    height: 56px;
    width: 100%;
    box-shadow: 0px -1px 14px 5px rgba(0,0,0,0.4);
    background-color: var(--color-navbar-backgroud, var(--color-primary, #000));
    color: var(--color-navbar-text, #fff);
    padding-left: 16px;
    padding-right: 16px;
  }

  .container {
    width: 100%;
    max-width: 500px;
    margin:  0 auto;
    display:flex;
  }
</style>