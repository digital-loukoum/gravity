<script lang="ts">
	import { getSiteNodes } from 'src/utilities/getSiteNodes';
	import SiteNode from './SiteNode.svelte';
</script>

<aside>
	{#each getSiteNodes() as node}
		<SiteNode {node} />
	{/each}
</aside>

<style lang="sass">
	aside
		width: var(--sidebar-width)
		overflow: auto
		padding: 12rem 0 24rem
		position: fixed
		top: var(--header-height)
		left: 0
		border-right: 1px solid var(--border-color)
		min-height: 100vh
</style>
