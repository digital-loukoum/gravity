<script lang="ts">
	import { fade } from 'svelte/transition';
	import GravityIcon from 'src/components/GravityIcon.svelte';
	import Typewriter from 'src/components/Typewriter.svelte';

	let mainElement: null | HTMLElement = null;
</script>

<main bind:this={mainElement}>
	<GravityIcon size={320} />

	{#if mainElement}
		<div class="title" in:fade={{ delay: 200, duration: 200 }}>
			<span>
				<Typewriter value="Discover" initialDelay={200} />
			</span>
			<span class="gravity">
				<Typewriter value="Gravity" initialDelay={800} />
			</span>
		</div>
		<div class="subtitle" in:fade={{ delay: 1800 }}>The intuitive RPC framework</div>
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
		margin-left: 48rem
		letter-spacing: 16rem

	.subtitle
		font-family: Acherus
		text-transform: uppercase
		font-size: 16rem
		letter-spacing: 2rem
		color: var(--secondary-text-color)
</style>
