<script lang="ts">
	import { page } from '$app/stores';
	import { linkMatchesPath } from 'src/utilities/linkMatchesPath';

	export let to: string;
	export let variant: 'default' | 'block' | 'underline' | 'hover:underline' = 'default';
	export let style = '';

	$: external = !to.startsWith('/');
	$: active = linkMatchesPath(to, $page.url.pathname);
</script>

<a href={to} class={variant} class:active target={external ? '_blank' : undefined} {style}>
	<slot />
</a>

<style lang="sass">
	a
		display: flex
		align-items: center
		gap: 6rem
		color: inherit
		text-decoration: none
		position: relative

		&.block
			width: 100%

		&:is(:hover, .active)
			&.default
				color: var(--primary-color)
		
			&.block
				color: var(--primary-color)
				&.active
					font-weight: bold
					&:before
						content: ""
						position: absolute
						top: 0
						bottom: 0
						left: 0
						width: 3px
						background: var(--primary-color)
		
			&.underline
				color: inherit
				&:after
					content: ""
					position: absolute
					bottom: -4px
					left: 0
					right: 0
					height: 2px
					background: var(--primary-color)

	.external-icon
		display: flex
		align-items: center
		position: relative
		top: 1px
		left: -1px
</style>
