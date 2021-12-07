<script lang="ts">
	import { api } from '../api';

	let enemy = '';
	$: loadMeow = api.cat.meow(enemy);
</script>

<p>Enemy: <input bind:value={enemy} /></p>

{#await loadMeow}
	Loading...
{:then meow}
	{meow}
{/await}
