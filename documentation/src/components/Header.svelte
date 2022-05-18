<script lang="ts">
	export let version: string;
	import GithubIcon from 'svelte-material-icons/Github.svelte';
	import TwitterIcon from 'svelte-material-icons/Twitter.svelte';
	import Link from './Link.svelte';
</script>

<header id="gravity-header">
	<aside class="left">
		<img width="40" src="/icon.svg" alt="Gravity icon" />

		<Link variant="underline" to="/">
			<span class="title"> Gravity </span>
		</Link>

		<div class="beta">beta</div>

		<div class="by-digital-loukoums">
			<Link
				to="https://github.com/digital-loukoum"
				style="
				margin-left: 12px;
				font-family: Simplicity;
				font-size: 18px;
				top: 1px;
				letter-spacing: 1.4px;
			"
			>
				<span style="margin-right: 4px; position: relative;">by Digital Loukoums</span>
				<img src="/loukoums.png" alt="digital-loukoums-logo" width="36" height="36" />
			</Link>
		</div>
	</aside>

	<aside class="right">
		<Link variant="underline" to="/docs">Documentation</Link>
		<Link variant="underline" to="/changelog">Changelog</Link>
		<Link variant="default" to="https://twitter.com/Gin_Quin">
			<TwitterIcon size="24" />
		</Link>
		<Link variant="default" to="https://github.com/digital-loukoum/gravity">
			<GithubIcon size="24" />
			GitHub
		</Link>
	</aside>
</header>

<style lang="sass">
	header
		display: flex
		justify-content: space-between
		align-items: center
		font-family: Readex
		width: 100%

		aside
			display: flex
			align-items: center

			&.left
				gap: 16px
				
			&.right
				gap: 24px
		
		.title
			font-weight: bold
			font-size: 18px

	.beta
		padding: 2px 6px
		background: var(--secondary-color)
		color: white
		border-radius: 8px
		font-size: 12px
		// transform: rotate(-3deg)

	@media (max-width: 840px)
		.by-digital-loukoums
			display: none

	@media (max-width: 640px)
		aside.right
			display: none

</style>
