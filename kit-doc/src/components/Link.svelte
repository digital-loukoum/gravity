<script lang="ts">
	import { page } from '$app/stores';
	import { linkMatchesPath } from 'src/utilities/linkMatchesPath';

	export let to: string;
	export let variant: 'default' | 'underline' = 'default';
	export let style = '';

	$: active = linkMatchesPath(to, $page.url.pathname);
	$: isInternal = to.startsWith('/') || undefined;
</script>

<a
	href={to}
	sveltekit:prefetch={isInternal}
	class="link {variant}"
	class:active
	{style}
	target={isInternal ? undefined : '_blank'}
>
	<slot />
</a>

<style lang="sass">
	a
		display: flex
		align-items: center
		gap: 10px
		color: inherit
		text-decoration: none
		position: relative

		&:is(:hover, .active)
			&.default
				color: var(--primary-color)
		
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
