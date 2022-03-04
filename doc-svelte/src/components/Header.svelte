<script lang="ts">
	export let version: string;
	import GithubIcon from 'svelte-material-icons/Github.svelte';
</script>

<header>
	<aside class="left">
		<img src="/icon.svg" alt="icon" width="48" height="48" />
		<div class="title">Gravity</div>
	</aside>

	<aside class="right">
		<a href="/guide">Guide</a>
		<a href="/api">API</a>
		<a href="/changelog">v{version}</a>
		<a href="/changelog"><GithubIcon size="24" /></a>
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
		font-family: "Readex Pro", ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont, sans-serif

		aside
			display: flex
			align-items: center

			&.left
				gap: 8rem
				
			&.right
				gap: 24rem
</style>
