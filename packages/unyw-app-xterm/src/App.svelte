<script>
	import {Keyboardbar, VncViewer} from '@unyw/ui'
	import Unyw from '@unyw/api'
	
	let dialog = false
	
	let terminal = 'terminal1'

	$: {
		const socket = `xterm-app-${terminal}`
		Unyw()
		  .then( ({process}) => process.screen({
				socket,
				command: 'xterm'
			}))
	}
	
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
	<select bind:value={terminal}>
		<option value="terminal1">Terminal 1</option>
		<option value="terminal2">Terminal 2</option>
		<option value="terminal3">Terminal 3</option>
		<option value="terminal4">Terminal 4</option>
		<option value="terminal5">Terminal 5</option>
	</select>
	<VncViewer socket={`xterm-app-${terminal}`}/>
	<Keyboardbar/>
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
		--color-primary: #000;
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