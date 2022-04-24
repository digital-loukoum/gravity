<script lang="ts">
	import Link from './Link.svelte';
</script>

<span class="by-digital-loukoums">
	<Link
		to="https://github.com/digital-loukoum"
		style="
		font-family: Simplicity;
		font-size: 18px;
		letter-spacing: 1.4px;
	"
	>
		<span style="position: relative;">
			<slot>by Digital Loukoums</slot>
		</span>
		<img src="/loukoums.png" alt="digital-loukoums-logo" width="36" height="36" />
	</Link>
</span>

<style lang="sass">
	img
		margin: 0

	.by-digital-loukoums > :global(a)
		border-bottom: none
</style>
