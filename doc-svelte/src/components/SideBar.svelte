<script lang="ts">
	import type { SiteNode } from 'src/utilities/getSiteNodes';
	import SiteNodeView from './SiteNodeView.svelte';

	export let siteNodes: Array<SiteNode>;
</script>

<aside>
	{#each siteNodes as node}
		<SiteNodeView {node} />
	{/each}
</aside>

<style lang="sass">
	aside
		overflow: auto
		--sidebar-footer-height: 64rem
		width: var(--sidebar-width)
		position: fixed
		min-height: 100vh
		top: var(--header-height)
		left: 0
		border-right: 1px solid var(--border-color)
		padding: 12rem 0 24rem
</style>
