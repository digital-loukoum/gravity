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
			<Typewriter value="Gravity" initialDelay={400} />
		</div>
		<div class="subtitle" in:fade={{ delay: 1400 }}>The intuitive RPC framework</div>
	{/if}
</main>

<style lang="sass">
	main
		padding: 12vh 0 32rem

	.title
		font-family: Acherus
		font-size: 40rem
		text-transform: uppercase
		letter-spacing: 16rem

	.subtitle
		font-family: Acherus
		text-transform: uppercase
		font-size: 16rem
		letter-spacing: 2rem
		color: var(--secondary-text-color)
		margin-top: 24rem
</style>
