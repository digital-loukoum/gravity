<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '../api';

	onMount(() => {
		console.log('api', api);
		api.cat.meow().then((value) => console.log(value));
	});
</script>

Hello world :)
