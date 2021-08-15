<script>
  import {sendKey, handleEvent as handleEventVNC} from './VncViewer.svelte'

  let ivalue = ""
  let tab, ctrl, alt, left, up, down, right, keyboard, keyboardInput

  let ctrlActive = false
  let altActive  = false

  let onFocus = false

  const isClickOn = (x, element) => {
    const rect = element.getBoundingClientRect();
    return x > rect.left && x< rect.right;
  }

	const onClick = (e) => {
    e.preventDefault()
    if(isClickOn(e.clientX, tab)) sendKey(0xff09, null) 
    if(isClickOn(e.clientX, ctrl)){
      ctrlActive = !ctrlActive
      sendKey(0xffe3, null, ctrlActive)
    } 

    if(isClickOn(e.clientX, alt)){
      altActive = !altActive
      sendKey(0xffe9, null, altActive)
    } 

    if(isClickOn(e.clientX, left))  sendKey(0xff51, null) 
    if(isClickOn(e.clientX, up))    sendKey(0xff52, null) 
    if(isClickOn(e.clientX, down))  sendKey(0xff54, null) 
    if(isClickOn(e.clientX, right)) sendKey(0xff53, null) 

    if(isClickOn(e.clientX, keyboard) && onFocus){
      keyboardInput.blur()
      onFocus = false
      return
    }

    if(!onFocus) onFocus = true

	} 

  const handleEvent = (event, e) => {
    e.preventDefault()
    handleEventVNC(event, e)
  }

  const onBlur = () => onFocus = false

</script>

<div class="unywui-bottombar">
  <div class="container">
    <p bind:this={tab}>TAB</p>
    <p bind:this={ctrl} class={ctrlActive ? 'active' : ''}>CTRL</p>
    <p bind:this={alt}  class={altActive ? 'active' : ''}>ALT</p>
    <i bind:this={left}  class="zmdi zmdi-long-arrow-left"/>
    <i bind:this={up}    class="zmdi zmdi-long-arrow-up"/>
    <i bind:this={down}  class="zmdi zmdi-long-arrow-down"/>
    <i bind:this={right} class="zmdi zmdi-long-arrow-right"/>
    <i bind:this={keyboard} class="zmdi zmdi-keyboard"/>
  </div>
  <input bind:value={ivalue} on:blur={onBlur} bind:this={keyboardInput} on:click={onClick} on:input={ (e) => handleEvent('input', e)} on:keyup={ (e) => handleEvent('keyup', e)} on:keydown={ (e) => handleEvent('keydown', e)} on:keypress={ (e) => handleEvent('keypress', e)} type="text" ref="keyboard" autocorrect="off" autocapitalize="none"
  autocomplete="off" spellcheck="false">
</div>

<style>
	input {
    font-size: 0.01px !important;
		position: relative;
		opacity: 0.0001;
		z-index: 50;
		height: 56px;
		top: 0px;
		display: inline-block;
	}

  p.active {
    color: orange;
  }

  .container > *{
    height: 56px;
    line-height: 56px;
    flex: 1 1 0;
  }

  div.unywui-bottombar > *{
    grid-row: 1;
    grid-column: 1;
  }


  div.unywui-bottombar {
    cursor: pointer;
    text-align: center;
    grid-template: 1fr / 1fr;
    display:grid;
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

  i {
    margin: 0;
    font-size: 18.5px;
  }
  p {
    margin: 0;
    font-size: 13px;
  }

</style>