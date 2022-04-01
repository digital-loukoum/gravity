<script context="module" lang="ts">
	export async function load({ fetch }) {
		return {
			props: {
				siteNodes: await (await fetch('/site-nodes')).json()
			}
		};
	}
</script>

<script lang="ts">
	import SideBar from 'src/components/SideBar.svelte';
	import type { SiteNode } from 'src/utilities/getSiteNodes';

	export let siteNodes: Array<SiteNode>;
</script>

<div class="content">
	<SideBar {siteNodes} />
	<main>
		<slot />
	</main>
</div>

<style lang="sass">
	.content
		max-width: none
		margin-left: var(--sidebar-width)
		align-items: flex-start
		padding: 0

	main
		max-width: 768rem
		padding: 32rem 40rem
		margin: auto
</style>
