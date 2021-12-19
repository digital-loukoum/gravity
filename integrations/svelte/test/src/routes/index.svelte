<script lang="ts">
	import { api, useApi } from '../api';

	let enemy = '';
	$: loadMeow = api.cat.meow(enemy);
	// const { data, error } = useSWR('a', { fetcher: () => api.cat.meow() });
	$: meow = useApi().cat.meow(enemy);
	console.log('meow', meow);
</script>

<p>Enemy: <input bind:value={enemy} /></p>

{#await loadMeow}
	Loading...
{:then meow}
	{meow}
{/await}

<p>
	Received data: {$meow.data}
</p>
<p>
	Received error: {$meow.error}
</p>
