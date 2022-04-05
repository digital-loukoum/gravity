<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit/types';
	import Link from 'src/components/Link.svelte';
	import type { SiteNode } from 'src/utilities/getSiteMap';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';

	export const load: Load = async ({ params, fetch }) => {
		const { route } = params;

		const { siteNode, html } = await (await fetch(`/documentation/${route}.json`)).json();

		if (!siteNode) {
			return {
				status: 404,
				title: 'Not found'
			};
		}

		return {
			props: {
				siteNode,
				html
			}
		};
	};
</script>

<script lang="ts">
	export let siteNode: SiteNode;
	export let html: string;
</script>

<h1>{siteNode.name}</h1>
{@html html}

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
