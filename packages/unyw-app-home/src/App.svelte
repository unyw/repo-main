<script>
	import {Bottombar} from '@unyw/ui'

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
		{#each Object.entries(apps) as [app, {icon, label= ''}]}
			<div class="app-container">
				<img src={icon} alt={`Icon for ${app}`} height="40px" width="40px"/>
				<p>{label}</p>
			</div>
		{/each}
	</div>
	{:else if active === 'add'}
	<div class="page page-add">
		<button>Edit repos <i class="zmdi zmdi-edit"/></button>
		<button>Add keys <i class="zmdi zmdi-key"/></button>
		<h3>https://</h3>
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
	}

	main {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-content: center;
	}

	.page {
		flex: 1 1 0;
		padding: 8px 16px 40px 16px;
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

		transition: background-color 0.3s ease;
	}

	.app-container:active {
		user-select: none;
		background-color: #ddd;
		transition: background-color 0s ease;

	}
</style>