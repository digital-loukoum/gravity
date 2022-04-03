<script>
	import Link from '../Link.svelte';

	import CoreFeature from './CoreFeature.svelte';
</script>

<div class="core-features">
	<CoreFeature color="secondary">
		<span slot="title"> Simple </span>

		Call your server functions from your client like any Javascript function.

		<span slot="link"> See examples </span>
	</CoreFeature>

	<CoreFeature color="tertiary">
		<span slot="title"> Flexible </span>

		Use Gravity with Svelte, SvelteKit, React, Next, Solid, Vue, or any other framework.

		<span slot="link"> Get started </span>
	</CoreFeature>

	<CoreFeature color="primary">
		<span slot="title"> Scalable </span>

		Group your server functions by services and enjoy a clean architecture.

		<span slot="link"> Read the docs </span>
	</CoreFeature>
</div>

<style lang="sass">
	.core-features
		margin-top: 64rem
		display: flex
		gap: 64rem
</style>
