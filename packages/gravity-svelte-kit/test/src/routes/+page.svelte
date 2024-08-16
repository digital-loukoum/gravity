<script lang="ts">
	import { onMount } from "svelte";
	import RequestCard from "../components/RequestCard.svelte";
	import { api, store } from "../gravity/api";

	let a = 1;
	let b = 2;

	let pings: Array<string> = [];

	$: apiSum = api.math.add(+a, +b);
	$: storeSum = store.math.add(+a, +b);

	onMount(() => {
		startStream();
	});

	async function startStream() {
		const stream = await api.stream.ping("Toto");
		if (stream.error) {
			console.error("Error while receiving the stream:", stream.error);
			return;
		}

		for await (const ping of stream.data) {
			pings = [...pings, ping];
		}
	}
</script>

<p>
	a: <input bind:value={a} />
</p>

<p>
	b: <input bind:value={b} />
</p>

{#await apiSum}
	<RequestCard
		title="Api sum"
		loading={true}
		refreshing={true}
		data={undefined}
		error={undefined}
	/>
{:then { data, error }}
	<RequestCard
		title="Api sum"
		loading={false}
		refreshing={false}
		{data}
		{error}
	/>
{/await}

<RequestCard
	title="Store sum"
	loading={$storeSum.isLoading}
	refreshing={$storeSum.isRefreshing}
	data={$storeSum.data}
	error={$storeSum.error}
/>

<h3>Pings</h3>

{#each pings as ping}
	<p>{ping}</p>
{/each}
