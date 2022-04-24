<script context="module" lang="ts">
	export async function load({ fetch }) {
		const props = await (await fetch('/env')).json();
		return { props };
	}
</script>

<script lang="ts">
	import Time from '../components/Time.svelte';
	import { api, store } from '../gravity/api';

	export let foo: string;

	console.log('Foo:', foo);

	let enemy = '';
	$: loadMeow = api.cat.meow(enemy);
	$: meow = store.cat.meow(enemy);

	let showTime = true;
</script>

<button on:click={() => (showTime = !showTime)}>Show time</button>

{#if showTime}
	<Time />
{/if}

<p>Enemy: <input bind:value={enemy} /></p>

<div>[[ API STORE ]]</div>
<p>
	{#if $meow.isLoading}
		Loading...
	{:else if $meow.error}
		Error: {$meow.error}
	{:else}
		Loaded!
	{/if}
</p>
<p>
	Received: {$meow.data}
</p>

<p>
	{#if $meow.isRefreshing}
		Refreshing...
	{/if}
</p>

<div>[[ API ]]</div>
{#await loadMeow}
	<p>Loading...</p>
	<p />
{:then meow}
	<p>Loaded!...</p>
	<p>
		Received: {meow.data}
	</p>
{/await}
