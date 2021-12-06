<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '../api';

	const loadMeow = api.cat.meow();
</script>

{#await loadMeow}
	Loading...
{:then meow}
	{meow}
{/await}
