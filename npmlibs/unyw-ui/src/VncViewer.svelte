<script>
  import { onMount } from 'svelte';
  import Unyw from '@unyw/api'

  export let background = '#fff'

  const UNYW_IP = window.__UNYW_PRIVATE_IP || 'localhost'
  const script = 'script'

  let vncInfo = Unyw().then( unyw => unyw.unyw.info())
  let vncIframe
  onMount(async () => {
    const {process} = await Unyw()

    console.log(await process.screen({

      width: vncIframe.clientWidth,
      height: vncIframe.clientHeight,

    }))

		console.log(vncIframe.clientWidth, vncIframe.clientHeight)
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

    <iframe id="lc-layout-vncviewer" title="vncviewer"
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
          console.log('onload')
          var vncConnection = new noVNC(
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


