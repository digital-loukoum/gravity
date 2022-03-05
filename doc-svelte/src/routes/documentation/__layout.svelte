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

<div class="guide">
	<SideBar {siteNodes} />
	<slot />
</div>

<style lang="sass">
	.guide
		margin-left: var(--sidebar-width)
		align-items: flex-start
</style>
