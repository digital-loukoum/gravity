<script lang="ts">
	import { api, useApi } from '../gravity/api';

	let enemy = '';
	$: loadMeow = api.cat.meow(enemy);
	$: meow = useApi().cat.meow(enemy);
</script>

<p>Enemy: <input bind:value={enemy} /></p>

<div>api:</div>
{#await loadMeow}
	<p>Loading...</p>
	<p />
{:then meow}
	<p>Loaded!...</p>
	<p>
		Received: {meow}
	</p>
{/await}

<div>useApi:</div>
<p>
	{#if $meow.isLoading}
		Loading...
	{:else if $meow.error}
		Error: {$meow.error}
	{:else}
		Loaded!
	{/if}
</p>
<p>
	Received: {$meow.data}
</p>
