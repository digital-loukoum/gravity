<script lang="ts">
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import FeatureFooter from '../FeatureFooter.svelte';

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

	<FeatureFooter {link} {color}>
		<slot name="link" />
	</FeatureFooter>
</div>

<style lang="sass">
	.core-feature
		padding: 32px
		border: 1px solid var(--color)
		width: 260px
		height: 260px
		border-radius: 20%
		display: flex
		flex-direction: column
		align-items: stretch
		justify-content: space-between
		font-family: Readex

	main
		flex: 1
		padding: 4px 0

	header
		display: flex
		font-size: 20px
		text-transform: uppercase
		align-items: center
		gap: 8px
</style>
