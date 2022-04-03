<script lang="ts">
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import Link from '../Link.svelte';

	export let color: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let link = '';
</script>

<div class="core-feature" style="--color: var(--{color}-color);">
	<header>
		<ArrowRight color="var(--color)" />
		<slot name="title" />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<Link to={link} variant="hover:underline">
			<slot name="link" />
			<ArrowRight />
		</Link>
	</footer>
</div>

<style lang="sass">
	.core-feature
		padding: 32rem
		border: 1px solid var(--color)
		width: 260rem
		height: 260rem
		border-radius: 20%
		display: flex
		flex-direction: column
		align-items: stretch
		font-family: Readex
		justify-content: space-between

	header
		display: flex
		font-size: 20rem
		text-transform: uppercase
		align-items: center
		gap: 8rem

	footer
		display: flex
		justify-content: flex-end
</style>
