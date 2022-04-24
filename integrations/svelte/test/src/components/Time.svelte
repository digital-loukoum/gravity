<script lang="ts">
	import { useStore } from 'src/gravity/api';
	import { onDestroy, onMount } from 'svelte';

	const now = useStore({ network: 'if-needed', interval: 50000 }).time.now();
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
