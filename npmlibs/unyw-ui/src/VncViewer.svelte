<script context="module">
	let vnc

	export function sendKey(...params) {
	  vnc.contentWindow.vncConnection.sendKey(...params)
	}

  window.sendKeyVNC = sendKey
  let isEmpty = true

  export function handleEvent(event, e) {
    const events = {
      'keydown': (e) => vnc.contentWindow.vncConnection._keyboard._handleKeyDown(e),
      'keyup':  (e) => vnc.contentWindow.vncConnection._keyboard._handleKeyUp(e),
      'keypress':  (e) => vnc.contentWindow.vncConnection._keyboard._handleKeyPress(e),
      'input': (e) => {
        if(e.inputType === 'deleteContentBackward'){
          sendKey(0xff08,null)
          e.preventDefault()
          return 
        }
        sendKey(e.data.charCodeAt(0), e.data.charCodeAt(0))
      }
    }

    if(event === 'keydown' && e.keyCode === 229){
      isEmpty = true
    }

    if(event == 'input'){
      isEmpty = false
    }

    if(event === 'keyup' && e.keyCode === 229 && isEmpty){
      sendKey(0xff08,null)
      return
    }
	  events[event](e)
	}
</script>

<script>
  import { onMount } from 'svelte';
  import Unyw from '@unyw/api'

  export let background = '#fff'
  export let socket

  const UNYW_IP = window.__UNYW_PRIVATE_IP || 'localhost'
  const script = 'script'

  let vncInfo = Unyw().then( unyw => unyw.unyw.info())
  let vncIframe, vncFrame

  $: { if(vncIframe != null){
    handleResize()
  }}

  $: { if(vncFrame != null){
      vnc = vncFrame
  }}


  const handleResize = async() =>{
      if(!vncIframe) return null
      const {process} = await Unyw()
      return await process.screen({
        socket: socket,
        width: vncIframe.clientWidth,
        height: vncIframe.clientHeight,

      })
    }  

  onMount(async () => {
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(() => handleResize())
    })
    myObserver.observe(vncIframe)
	});
</script>

<style>
  div {
    width: 100%;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
  }

  iframe {
    border: 0;
    width: 100%;
    flex: 1 1 0;
  }
</style>

<div bind:this={vncIframe}>
  {#await vncInfo}
    <span style="display: none"/>
  {:then {vnc: {token, width, height}}} 

    <iframe id="lc-layout-vncviewer" title="vncviewer" bind:this={vncFrame}
    srcdoc={`
    <html>
    <${script} src='./novnc/novnc.min.js'></${script}>
    <style> 
      body { width:${width}px; height:${height}px; }
      body * { overflow: hidden !important;  background-color: ${background} !important;}
      body > canvas { background-color: transparent !important;}
    </style>
    <body style='overflow: hidden; padding: 0; margin:0; background-color: ${background};'>
      <${script}>
        window.onload = function(){
          window.vncConnection = new noVNC(
              document.body,
              'ws://${UNYW_IP}:12081/websockify',
              {repeaterID: '',  shared: true,  credentials: { password: '${token}' }, }
          )

          document.body.addEventListener('keydown',  (e) =>	vncConnection._keyboard._handleKeyDown(e)  )
          document.body.addEventListener('keyup',    (e) => vncConnection._keyboard._handleKeyUp(e)    )
          document.body.addEventListener('keypress', (e) => vncConnection._keyboard._handleKeyPress(e) )
          vncConnection.scaleViewport = true
          vncConnection.addEventListener('disconnect', () => setTimeout( () => location.reload(), 500));
          vncConnection.addEventListener('credentialsrequired', () => vncConnection.sendCredentials({ password: '${token}' }));
        }
      </${script}>
    </html> `}>
    </iframe>
  {:catch e}
    <p>Error</p>
  {/await}
</div>


