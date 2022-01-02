<script lang="ts">
	import { api, useApi } from '../gravity/api';

	let enemy = '';
	$: loadMeow = api.cat.meow(enemy);
	$: meow = useApi().cat.meow(enemy);
</script>

<p>Enemy: <input bind:value={enemy} /></p>

{#await loadMeow}
	Loading...
{:then meow}
	{meow}
{/await}

<p>
	isLoading?: {$meow.isLoading}
</p>
<p>
	Received data: {$meow.data}
</p>
{#if $meow.error}
	<p>
		Received error: {$meow.error}
	</p>
{/if}
