<main class="main-layout">
	<slot />
</main>

<style lang="sass">
	main
		padding-top: var(--header-height)

	:global(.main-layout > *)
		margin: auto
		max-width: 680px
		padding: 32rem 40rem
		display: flex
		flex-flow: column
		align-items: center
</style>
