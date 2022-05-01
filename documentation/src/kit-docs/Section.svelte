<script lang="ts">
	import { Admonition } from '@svelteness/kit-docs';

	export let type: 'danger' | 'experimental' | 'info' | 'note' | 'tip' = 'info';
</script>

<div class="section">
	<Admonition {type}>
		<slot />
	</Admonition>
</div>

<style lang="sass">
	.section
		width: min(1140px, 90%)
		margin: 60px auto

		@media (max-width: 420px)
			display: none

	.section :global(.admonition)
		padding: 40px
		padding-right: 50px
		border-top-left-radius: 6px
		border-bottom-left-radius: 6px
		border-top-right-radius: 24px
		border-bottom-right-radius: 24px

	.section :global(.admonition > *:first-child)
		display: none

	.section :global(.admonition h2)
		font-family: Readex
		margin: 12px 0 56px
		text-align: center
		letter-spacing: 1px
		font-size: 36px
		transform: rotate(-2deg)

	.section :global(.admonition h2 > a)
		display: none

	.section :global(.admonition p)
		margin-top: -6px
		margin-bottom: 24px
	
	.section :global(.admonition ul)
		margin-top: -20px
		margin-bottom: 24px
</style>
