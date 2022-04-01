<script lang="ts">
	import { fade } from 'svelte/transition';
	import GravityIcon from 'src/components/GravityIcon.svelte';
	import Typewriter from 'src/components/Typewriter.svelte';

	let mainElement: null | HTMLElement = null;
</script>

<main bind:this={mainElement}>
	<GravityIcon size={320} />

	{#if mainElement}
		<div class="title" in:fade={{ delay: 400, duration: 1000 }}>
			Discover
			<span class="gravity">
				<Typewriter value="Gravity" initialDelay={1000} />
			</span>
		</div>
		<div class="subtitle" in:fade={{ delay: 3000 }}>The natural RPC framework</div>
	{/if}
</main>

<style lang="sass">
	main
		padding: 12vh 0 32rem

	.title
		font-family: Acherus
		font-size: 40rem
		text-transform: uppercase
		margin: 48rem 0 16rem
		letter-spacing: 12rem
	
	.gravity
		margin-left: 12rem
		letter-spacing: 16rem

	.subtitle
		font-family: Acherus
		text-transform: uppercase
		font-size: 16rem
		letter-spacing: 2rem
		color: var(--secondary-text-color)
</style>
