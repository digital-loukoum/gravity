<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit/types';
	import { findSiteNode } from 'src/utilities/findSiteNode';
	import type { SiteNode } from 'src/utilities/getSiteMap';

	export const load: Load = async ({ params, fetch }) => {
		const { route } = params;

		const map = await (await fetch(`/documentation/map.json`)).json();
		const siteNode = findSiteNode(map, `documentation/${route}`);

		return {
			props: {
				siteNode
			}
		};
	};
</script>

<script lang="ts">
	export let siteNode: SiteNode | undefined;
</script>

{#if siteNode}
	<h1>{siteNode.name}</h1>
	{@html 'html' in siteNode ? siteNode.html : ''}
{/if}
