<script lang="ts">
	export let version: string;
	import GithubIcon from 'svelte-material-icons/Github.svelte';
	import Link from './Link.svelte';
</script>

<header>
	<aside class="left">
		<img src="/icon.svg" alt="icon" width="48" height="48" />
		<Link variant="underline" to="/">
			<span class="title"> Gravity </span>
		</Link>
		<Link
			to="https://github.com/digital-loukoum"
			style="
				margin-left: 12rem;
				font-family: Simplicity;
				font-size: 18rem;
				top: 1px;
				letter-spacing: 1.4px;
			"
		>
			<span style="margin-right: 4px; position: relative;">by Digital Loukoums</span>
			<img src="/loukoums.png" alt="digital-loukoums-logo" width="36" height="36" />
		</Link>
	</aside>

	<aside class="right">
		<Link variant="underline" to="/documentation">Documentation</Link>
		<Link variant="underline" to="/changelog">Version {version}</Link>
		<Link variant="default" to="https://github.com/digital-loukoum/gravity">
			<GithubIcon size="24" />
			GitHub
		</Link>
	</aside>
</header>

<style lang="sass">
	header
		padding: 4rem 32rem 4rem 16rem
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
		
		.title
			font-weight: bold
			font-size: 18rem
</style>
