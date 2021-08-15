<script>
	import {Bottombar, Checkbox, VncViewer} from '@unyw/ui'
	import Unyw from '@unyw/api'
	
	let open = false
	let active = 'apps'

	let dialog = false

	let textrepo = ''
	let textkey = ''

	Unyw()
		.then( ({file}) => file.read({path: '/etc/apk/repositories'}))
		.then( ({text}) => textrepo = text)

	const bashStr = str => `'${str.replace(`'`, `'"'"'`)}'`

	const run = async (command) => {
		const {file,process} = await Unyw()
		const tmpFiles = Object.keys((await file.list({path: '/run/unyw'})).list)
		console.log("mpt", tmpFiles)
		if(tmpFiles.includes('home-apk-process.lock')){
			dialog = 'error-apk-running'
			return
		}
		active = 'logs'
		await file.write({path: '/run/unyw/home-apk-process.lock', text: 'lock'})
		await process.kill({socket: 'home-apk-process'})
		await process.screen({
			socket: 'home-apk-process',
			command: `xterm -e 'date; echo ${command}; ${command}; rm /run/unyw/home-apk-process.lock; read'`
		})
	}

	let untrustedChecked = false
	let debugmodeChecked = false

	Unyw()
		.then( ({file}) => file.list({path: '/var/unyw/settings'}))
		.then( ({list}) => {
			untrustedChecked = "ALLOW_UNTRUSTED" in list
			debugmodeChecked = "DEBUG_MODE" in list
		})

	const handleChangeUntrusted = () => {
		Unyw().then( ({process}) => process.run({command: 
			untrustedChecked ? 'rm -f /var/unyw/settings/ALLOW_UNTRUSTED' : 'mkdir -p  /var/unyw/settings && touch /var/unyw/settings/ALLOW_UNTRUSTED'}))
	}
	const handleChangeDebugmode = (e) => {
		e.preventDefault()

		Unyw().then( async ({process, intent}) => {
			const {authenticated} = await intent.authenticate({title: "Warning", text:"Enabling/disabling DEBUG_MODE is dangerous"})
			if(!authenticated) return
			debugmodeChecked = !debugmodeChecked
			process.run({command: 
				debugmodeChecked ? 'mkdir -p  /var/unyw/settings && touch /var/unyw/settings/DEBUG_MODE' : 'rm -f /var/unyw/settings/DEBUG_MODE'})
		})
	}
	
</script>

{#if open}
<main>
	<div class="page">
		<h1>Open with...</h1>
		{#await Unyw()
			.then( ({file}) => file.list({path: '/usr/share/unyw/apps'}))
			.then( ({list}) => Object.keys(list).filter(app => app != 'home'))}
				<span class="hidden"/>
		{:then apps} 
			{#each apps as app}
			<div class="app-container" on:click={() => window.open(`/apps/${app}/index.html`, '_self')}>
				<div style="width: 60px; height:40px">
					<img src={`/apps/${app}/icon.png`} alt={`Icon for ${app}`} height="40px">
				</div>
				<span style="font-size: 1rem">{app}</span>
			</div>
		{/each}
		{/await}
	</div>
</main>

{:else}
{#if dialog}
	<div class="dialog-mask" on:click={ () => dialog = false}/>
	<div class="dialog">
		{#if dialog == 'error-apk-running'}
		<h3>Error</h3>
		<p>Another installation process is already running. Please wait.</p> 
		<button class="ok" on:click={ () => dialog = false}>ok</button>
		{:else if dialog == 'edit-repos'}
			<h3>Edit repos</h3>
			<div>
				<textarea bind:value={textrepo} style="width: 100%; min-height: 120px; text-align: left;"/>
			</div>
			<button on:click={ () => dialog = false}>cancel</button>
			<button class="ok" on:click={ async() => {
				await	Unyw()
					.then( ({file}) => file.write({path: '/etc/apk/repositories', text: textrepo.trim()}))
				dialog = false
			}}>ok</button>
		{:else if dialog == 'add-key'}
		<h3>Add key</h3>
		<div>
			<p>Enter key url</p>
			<input type="text" bind:value={textkey} style="width: 100%; text-align: left;"/>
		</div>
		<button on:click={ () => dialog = false}>cancel</button>
		<button class="ok" on:click={ async() => {
			dialog = false
			run(`wget -P /etc/apk/keys/ ${bashStr(textkey)}`)
		}}>ok</button>
		{/if}
	</div>
{/if}

<main>
	{#if active === 'apps'}
	<div class="page page-apps">
		{#await Unyw()
			.then( ({file}) => file.list({path: '/usr/share/unyw/apps'}))
			.then( ({list}) => Object.keys(list).filter(app => app != 'home'))}
				<span class="hidden"/>
		{:then apps} 
			{#each apps as app}
			<div class="app-container" on:click={() => window.open(`/apps/${app}/index.html`, '_self')}>
				<div style="width: 60px; height:40px">
					<img src={`/apps/${app}/icon.png`} alt={`Icon for ${app}`} height="40px">
				</div>
				<span style="font-size: 1rem">{app}</span>
			</div>
		{/each}
		{/await}
	</div>
	{:else if active === 'add'}
	<div class="page page-add" id="addid">
		<button on:click={() => dialog = 'edit-repos'}>Edit repos <i class="zmdi zmdi-edit"/></button>
		<button on:click={() => dialog = 'add-key'}>Add key <i class="zmdi zmdi-key"/></button>
		<button on:click={() => run(`apk -U --no-cache ${untrustedChecked ? '--allow-untrusted' : ''} upgrade`)}>Upgrade all <i class="zmdi zmdi-refresh-sync-alert"/></button>
		{#await Unyw()
			.then( ({file}) => file.read({path: '/etc/apk/repositories'}) )
			.then( ({text}) => text.split('\n').filter(repo => repo && !repo.startsWith('https://dl-cdn.alpinelinux.org/alpine')))}
				<span class="hidden"/>	
		{:then repos} 
			{#each repos as repo}
			{#await fetch(`${repo}/manifest.json`).then( r => r.json())}
				<span class="hidden"/>
			{:then manifest} 
				<h3>{repo}</h3><hr>
				{#each manifest.apps as app}
				<div on:click={() => run(`apk add --no-cache ${untrustedChecked ? '--allow-untrusted' : ''} ${bashStr(app)}`)} class="app-container">
					<div style="width: 60px; height:40px">
						<img src={`${repo}/icons/${app}.png`} alt={`Icon for ${app}`} height="40px">
					</div>
					<span style="font-size: 1rem">{app.replace('unyw-app-', '')}</span>
				</div>
				{/each}
			{:catch e}
				<span class="hidden"/>
			{/await}

			{/each}
		{/await}
	</div>
	{:else if active === 'logs'}
	<div class="page page-logs">
		<select>
			<option value="">apk process</option>
		</select>
		<VncViewer socket="home-apk-process"/>
	</div>
	{:else if active === 'settings'}
	<div class="page page-settings">
		<h1>Settings</h1>
		<div style="margin: 10px 0">
			<Checkbox bind:checked={untrustedChecked} on:click={handleChangeUntrusted}>Allow untrusted</Checkbox>
		</div>
		<div style="margin-bottom: 25px">
			<Checkbox bind:checked={debugmodeChecked} on:click={handleChangeDebugmode}>Debug mode</Checkbox>
		</div>
		<p>Work in progress :)</p>

		<h2>Tokens</h2>
		{#await Unyw()
			.then( ({unyw}) => unyw.info())}
			<span class="hidden"/>
		{:then {tokens} } 
			{#each Object.entries(tokens) as [key, value]}
			<p><b>{key}</b> {value}</p>
			{/each}	
		{/await}
	</div>
	{/if}
	
	<Bottombar tabs={{
		'apps'    : {icon: 'zmdi zmdi-widgets', label: 'Apps'}, 
		'add'     : {icon: 'zmdi zmdi-download', label: 'Add app'},  
		'logs'    : {icon: 'zmdi zmdi-memory',   label: 'Logs'},  
		'settings': {icon: 'zmdi zmdi-settings', label: 'Settings'},  
	}} bind:active={active}/>
</main>
{/if}

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

	.hidden {
		display: none;
	}

	:global(body){
		margin: 0px;
		padding: 0px;
		font-family: 'Roboto', 'Arial', sans-serif;
		--color-primary: #1565C0;
		-webkit-tap-highlight-color: transparent;
	}

	main {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-content: center;
	}

	.page {
		flex: 1 1 0;
		padding: 16px 16px 40px 16px;
		box-sizing: border-box;
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		overflow-y: auto;
	}

	button {
    margin: 5px 0;
    padding: 10px 20px;
		border-radius: 20px;
  }

	.app-container {
		display: flex;
		align-items: center;
		border-radius: 10px;
		background-color: #00000000;
		min-height: 50px;
		transition: background-color 0.05s ease;
		user-select: none;
	}

	.app-container img {
		filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.45));
	}

	.app-container:active {
		user-select: none;
		background-color: #ddd;
		transition: background-color 0s ease;

	}

	.page-add h3 {
		margin-top: 40px;
	}

	.page-logs {
		display: flex;
		padding-bottom: 20px;
		flex-direction: column;
	}

	.page-settings h1 {
		padding-top: 0;
		margin-top: 0;
	}

	.page-settings h2 {
		margin-top: 80px;
		margin-bottom: 20px;
	}

	.page-settings p {
		padding-top: 0;
		margin-top: 0;
		padding-bottom: 0;
		margin-bottom: 6px;
	}
</style>