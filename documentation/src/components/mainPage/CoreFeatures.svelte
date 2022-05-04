<script>
	import CoreFeature from './CoreFeature.svelte';
</script>

<div class="core-features">
	<CoreFeature color="secondary" link="/docs/getting-started/basic-example">
		<span slot="title"> Simple </span>

		Call your server functions from your client like any Javascript function.

		<span slot="link"> See examples </span>
	</CoreFeature>

	<CoreFeature color="tertiary" link="/docs/getting-started/installation">
		<span slot="title"> Flexible </span>

		Use Gravity with Svelte, React, Vue, Solid and deploy to a classic server or edge functions.

		<span slot="link"> Get started </span>
	</CoreFeature>

	<CoreFeature color="primary" link="/docs">
		<span slot="title"> Scalable </span>

		Group your server functions by services and enjoy a clean architecture.

		<span slot="link"> Read the docs </span>
	</CoreFeature>
</div>

<style lang="sass">
	.core-features
		margin-top: 64px
		gap: 64px
		display: flex
		justify-content: center
		flex-wrap: wrap
</style>
