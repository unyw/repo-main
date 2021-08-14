<script>
	import {Bottombar, VncViewer} from '@unyw/ui'
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
			
		{:then apps} 
			{#each apps as app}
			<div class="app-container">
				<img src={`/apps/${app}/icon.png`} alt={`Icon for ${app}`} height="40px" width="40px"/>
				<p>{app}</p>
			</div>
		{/each}
		{/await}
	</div>
	{:else if active === 'add'}
	<div class="page page-add" id="addid">
		<button>Edit repos <i class="zmdi zmdi-edit"/></button>
		<button>Add keys <i class="zmdi zmdi-key"/></button>
		<br>
		<h3>https://unyw.github.io/repo-main/stable</h3><hr>
	</div>
	{:else if active === 'logs'}
	<div class="page page-logs">
		<select>
			<option value="">-- Please choose an option --</option>
			<option value="dog">Dog</option>
			<option value="cat">Cat</option>
			<option value="hamster">Hamster</option>
			<option value="parrot">Parrot</option>		
		</select>
		<VncViewer/>
	</div>
	{:else if active === 'settings'}
	<div class="page page-settings">
		<h1>Settings</h1>
		<p>Work in progress :)</p>
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
    margin: 0px;
    padding: 10px 20px;
		border-radius: 20px;
  }

	.app-container {
		display: flex;
		align-items: center;
		border-radius: 10px;
		background-color: #00000000;

		transition: background-color 0.05s ease;
	}

	.app-container:active {
		user-select: none;
		background-color: #ddd;
		transition: background-color 0s ease;

	}

	.page-logs {
		display: flex;
		padding-bottom: 20px;
		flex-direction: column;
	}
</style>