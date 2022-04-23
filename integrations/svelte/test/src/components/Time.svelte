<script lang="ts">
	import { apiStore } from 'src/gravity/api';
	import { onDestroy, onMount } from 'svelte';

	const now = apiStore({ network: 'if-needed', interval: 450 }).time.now();
	let interval: NodeJS.Timer;

	onMount(() => {
		interval = setInterval(() => {
			now.refresh();
		}, 500);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

Time is: {new Date($now.data).toLocaleTimeString()}
