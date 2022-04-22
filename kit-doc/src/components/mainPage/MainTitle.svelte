<script lang="ts">
	import { fade } from 'svelte/transition';
	import Typewriter from '../Typewriter.svelte';

	let mainElement: null | HTMLElement = null;
</script>

<main bind:this={mainElement}>
	{#if mainElement}
		<div class="title" in:fade={{ delay: 200, duration: 200 }}>
			<Typewriter value="Gravity" initialDelay={400} />
		</div>
		<div class="subtitle" in:fade={{ delay: 1400 }}>The scalable RPC framework</div>
	{/if}
</main>

<style lang="sass">
	main
		width: 100%
		display: flex
		flex-direction: column
		align-items: center
		height: 108px
		text-align: center

	.title
		font-family: Acherus
		font-size: 40px
		text-transform: uppercase
		letter-spacing: 16px

	.subtitle
		font-family: Acherus
		text-transform: uppercase
		font-size: 16px
		letter-spacing: 2px
		color: var(--secondary-text-color)
		margin-top: 24px
</style>
