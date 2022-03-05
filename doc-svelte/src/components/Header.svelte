<script lang="ts">
	export let version: string;
	import GithubIcon from 'svelte-material-icons/Github.svelte';
</script>

<header>
	<aside class="left">
		<img src="/icon.svg" alt="icon" width="48" height="48" />
		<a class="title" href="/">Gravity</a>
	</aside>

	<aside class="right">
		<a href="/guide">Guide</a>
		<a href="/changelog">v{version}</a>
		<a href="https://github.com/digital-loukoum/gravity" target="_blank">
			<GithubIcon size="24" />
			GitHub
		</a>
		<input placeholder="Search" />
	</aside>
</header>

<style lang="sass">
	header
		padding: 4rem 16rem
		position: fixed
		top: 0
		left: 0
		right: 0
		display: flex
		justify-content: space-between
		align-items: center
		border-bottom: 1px solid var(--border-color)
		height: var(--header-height)
		background-color: var(--background-color)
		font-family: Readex

		aside
			display: flex
			align-items: center

			&.left
				gap: 4rem
				
			&.right
				gap: 24rem
		
		a
			display: flex
			align-items: center
			gap: 6rem
			&:not(.icon):hover
				color: inherit
				&:after
					content: ""
					position: absolute
					bottom: -4px
					left: 0
					right: 0
					height: 2px
					background: var(--primary-color)

		.title
			// text-transform: uppercase
			font-weight: bold
			font-size: 18rem
</style>
