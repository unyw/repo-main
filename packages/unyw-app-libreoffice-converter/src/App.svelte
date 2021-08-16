<script>
	import {Topbar, VncViewer} from '@unyw/ui'
	import Unyw from '@unyw/api'
	
	let dialog = false
	let format = 'pdf'
	const socket = `libreoffice-convert-app`

	const bashStr = str => `'${str.replaceAll(`'`, `'"'"'`)}'`

</script>
{#if dialog}
	<div class="dialog-mask" on:click={ () => dialog = false}/>
	<div class="dialog">
		{#if dialog == 'error-apk-running'}
		<h3>Error</h3>
		<p>Another installation process is already running. Please wait.</p> 
		<button class="ok" on:click={ () => dialog = false}>ok</button>
		{/if}
	</div>
{/if}

<main>
	<Topbar>
		<h3>Libreoffice converter</h3>
	</Topbar>
	<div style="flex: 1 1 0; text-align:center; margin: 40px;">
		<div><button on:click={ () => Unyw().then( ({intent}) => {
			intent.filepicker({
				file: 'document',
				mimetype: 'application/*',
				folder: 'libreoffice-converter'
			})
		})}>Open file</button></div>
		<div><select bind:value={format}>
			<option value="pdf">pdf</option>
			<option value="odt">odt</option>
			<option value="doc">doc</option>
			<option value="docx">docx</option>
			<option value="html">html</option>
			<option value="txt">txt</option>
		</select></div>
		<div><button on:click={ () => {
			Unyw().then( async({process, intent}) => {
				await process.kill({
					socket
				})

				console.log(`xterm -e  sh -c ${bashStr(`echo "Converting document..."; libreoffice --headless --convert-to ${format} /storage/unyw/libreoffice-converter/document --outdir /storage/unyw/libreoffice-converter; `+
					`unyw-api /intent/authenticate ${bashStr(`{"title":"ciao", "text": "ciaotx"}`)}; echo ""; echo "Done!"; read`)}`)
				await process.screen({
					socket,
					command: `xterm -e  sh -c ${bashStr(`echo "Converting document..."; libreoffice --headless --convert-to ${format} /storage/unyw/libreoffice-converter/document --outdir /storage/unyw/libreoffice-converter; `+
					`unyw-api /intent/open ${bashStr(`{"file":"document.${format}", "folder": "libreoffice-converter", "mimetype":"*/*"}`)}; echo ""; echo "Done!"; read`)}`
					//	` unyw-api /intent/open ${bashStr(`{"file":"document.${format}", "folder":"libreoffice-converter", "mimetype":"*/*"}`)} ; echo "Done!"; read'`
				})

			})
		}}>Convert</button></div>
		
	</div>
	<p style="margin: 4px 16px;">Logs:</p>
	<div style="height: 40vh;">
		<VncViewer {socket}/>
	</div>
</main>

<style>
	.dialog{
		z-index: 20;
		background-color: #fff;
		display: block;
		position: fixed;
		top: 25vh;
		padding: 16px;
		left: calc(50vw - 250px);
		box-sizing: border-box;
		width: 500px;
		text-align: center;
		border-radius: 4px;
	}

	@media screen and (max-width: 500px) {
		.dialog {
			left: 16px;
			width: calc(100vw - 32px);
		}
	}


	
	.dialog-mask{
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: #000;
		z-index: 10;
		opacity: 50%;
	}

	.dialog button.ok{
		background-color: var(--color-primary);
		color: #fff;
	}


	:global(body){
		margin: 0px;
		padding: 0px;
		font-family: 'Roboto', 'Arial', sans-serif;
		--color-primary: rgb(22, 131, 0);
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
	}

	main {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-content: center;
	}


	button {
    margin: 5px 0;
    padding: 10px 20px;
		border-radius: 20px;
  }

</style>
