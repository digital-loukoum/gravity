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
		<a href={link} class="feature-link">
			<span class="link-text">
				<slot name="link" />
			</span>
			<span class="link-arrow">
				<ArrowRight />
			</span>
		</a>
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

	.feature-link
		display: flex
		align-items: center
		gap: 8rem


	.link-text
		color: var(--text-color)
		display: flex
		position: relative

		&:after
			content: ""
			position: absolute
			bottom: -4px
			left: 0
			right: 0
			height: 2px
			background: var(--color)

	.link-arrow
		font-size: 18rem
		color: var(--text-color)
		display: flex
		align-items: center
		margin-left: 4rem
		transform: translateX(-4rem) scale(1)
		transition: 150ms ease-in-out

	.feature-link:hover
		.link-arrow
			transform: translateX(0) scale(1.2)
</style>
