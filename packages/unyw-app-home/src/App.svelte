<script>
	import {Bottombar, Checkbox, VncViewer} from '@unyw/ui'
	import Unyw from '@unyw/api'

	const runCommand = command => Unyw().then(async({file, process}) => {
		const files = await file.list({path: "/run/unyw"})
		console.log(files)
		process.screen({
			socket: "home-apk",
			command:"",
		})
		file.list({path: '/'})
	})

	

	const apps = {
		'a': {icon: 'favicon.png', label: 'xterm'},
		'b': {icon: 'favicon.png', label: 'firefox'},
		'c': {icon: 'favicon.png', label: 'remote'},
		'd': {icon: 'favicon.png', label: 'vscode'},
		'e': {icon: 'favicon.png', label: 'gimp'},
		'f': {icon: 'favicon.png', label: 'libreoffice'},
	}

	let active = 'apps'
</script>


<main>
	{#if active === 'apps'}
	<div class="page page-apps">
		{#await Unyw()
			.then( ({file}) => file.list({path: '/usr/share/unyw/apps'}))
			.then( ({list}) => Object.keys(list))}
				<span class="hidden"/>
		{:then apps} 
			{#each apps as app}
			<div class="app-container">
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
		<button>Edit repos <i class="zmdi zmdi-edit"/></button>
		<button>Add keys <i class="zmdi zmdi-key"/></button>
		<button>Upgrade all <i class="zmdi zmdi-refresh-sync-alert"/></button>
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
				<div class="app-container">
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
		<VncViewer/>
	</div>
	{:else if active === 'settings'}
	<div class="page page-settings">
		<h1>Settings</h1>
		<p>Work in progress :)</p>
		<Checkbox>Debug mode</Checkbox>
	</div>
	{/if}
	
	<Bottombar tabs={{
		'apps'    : {icon: 'zmdi zmdi-widgets', label: 'Apps'}, 
		'add'     : {icon: 'zmdi zmdi-download', label: 'Add app'},  
		'logs'    : {icon: 'zmdi zmdi-memory',   label: 'Logs'},  
		'settings': {icon: 'zmdi zmdi-settings', label: 'Settings'},  
	}} bind:active={active}/>
</main>

<style>
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
</style>