<script lang="ts">
	import RequestCard from "./RequestCard.svelte";
	import { api, store } from "./api";
	import JohnDoe from "./JohnDoe.svelte";

	let a = "1";
	let b = "2";

	$: sumApi = api.math.add(+a, +b);
	$: storeSum = store.math.add(+a, +b);

	const john = store.user.getJohn();
	const updateEmail = (email: string) =>
		api.user.setJohn({
			email,
		});
</script>

<h1>John Doe</h1>

<JohnDoe {john} {updateEmail} />
<JohnDoe {john} {updateEmail} />

<hr />

<h1>Math</h1>

<p>a = <input bind:value={a} /></p>
<p>b = <input bind:value={b} /></p>

{#await sumApi}
	<RequestCard
		title="Api sum"
		loading
		refreshing
		data={undefined}
		error={undefined}
	/>
{:then result}
	<RequestCard
		title="Api sum"
		loading={false}
		refreshing={false}
		data={result.data}
		error={result.error?.message}
	/>
{/await}

<RequestCard
	title="Store sum"
	loading={$storeSum.isLoading}
	refreshing={$storeSum.isRefreshing}
	data={$storeSum.data}
	error={$storeSum.error}
/>

<hr />
