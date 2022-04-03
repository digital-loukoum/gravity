<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit/types';
	import Link from 'src/components/Link.svelte';
	import { findSiteNode } from 'src/utilities/findSiteNode';
	import type { SiteNode } from 'src/utilities/getSiteMap';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';

	export const load: Load = async ({ params, fetch }) => {
		const { route } = params;

		const map = await (await fetch(`/documentation/map.json`)).json();
		const siteNode = findSiteNode(map, `documentation/${route}`);

		if (!siteNode) {
			return {
				status: 404,
				title: 'Not found'
			};
		}

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

	<div class="navigator">
		<div class="to previous">
			{#if 'previous' in siteNode && siteNode.previous}
				<Link to="/{siteNode.previous.path}">
					<ArrowLeft />
					{siteNode.previous.name}
				</Link>
			{/if}
		</div>

		<div class="to next">
			{#if 'next' in siteNode && siteNode.next}
				<Link to="/{siteNode.next.path}">
					{siteNode.next.name}
					<ArrowRight />
				</Link>
			{/if}
		</div>
	</div>
{/if}

<style lang="sass">
	.navigator
		border-top: 1px solid var(--border-color)
		padding: 4rem 0
		margin: 52rem 0 0
		display: flex
		justify-content: space-between

	.to
		display: flex
		align-items: center
		font-size: 16rem
		color: var(--text-color)
		text-decoration: none
		font-weight: bold
		// text-transform: uppercase
		letter-spacing: 0.1rem
		padding: 24rem 0

		&.previous
			color: var(--pale-text-color)
</style>
