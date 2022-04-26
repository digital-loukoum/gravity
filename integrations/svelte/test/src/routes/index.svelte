<script context="module" lang="ts">
	export async function load({ fetch }) {
		const props = await (await fetch('/env')).json();
		return { props };
	}
</script>

<script lang="ts">
	import RequestCard from 'src/components/RequestCard.svelte';
	import { api, store } from '../gravity/api';

	let a = 1;
	let b = 2;

	$: apiSum = api.math.add(+a, +b);
	$: storeSum = store.math.add(+a, +b);
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
	<RequestCard title="Api sum" loading={false} refreshing={false} {data} {error} />
{/await}

<RequestCard
	title="Store sum"
	loading={$storeSum.isLoading}
	refreshing={$storeSum.isRefreshing}
	data={$storeSum.data}
	error={$storeSum.error}
/>
