<script lang="ts">
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';

	export let link: string;
	export let alignment: 'start' | 'center' | 'end' = 'end';
	export let color: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let padding = '';
</script>

<footer
	style="
	--color: var(--{color}-color);
	padding: {padding};
	justify-content: {alignment == 'center' ? 'center' : `flex-${alignment}`};
"
>
	<a href={link} class="feature-link">
		<span class="link-text">
			<slot />
		</span>
		<span class="link-arrow">
			<ArrowRight />
		</span>
	</a>
</footer>

<style lang="sass">
	footer
		display: flex
		margin: 0 !important

	.feature-link
		display: flex
		align-items: center
		gap: 8px
		border-bottom: none

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
		font-size: 18px
		color: var(--text-color)
		display: flex
		align-items: center
		margin-left: 4px
		transform: translateX(-4px) scale(1)
		transition: 150ms ease-in-out

	.feature-link:hover
		.link-arrow
			transform: translateX(0) scale(1.2)
</style>
