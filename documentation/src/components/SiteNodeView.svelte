<script lang="ts">
	import type { SiteNode } from 'src/utilities/getSiteMap';
	import { page } from '$app/stores';
	import { formatRouteName } from 'src/utilities/formatRouteName';
	import { linkMatchesPath } from 'src/utilities/linkMatchesPath';
	import Link from './Link.svelte';
	export let node: SiteNode;
	export let level = 0;

	const baseIndentation = 24;
	const indentationDelta = 20;

	$: style = getStyle(level);

	const getNodeName = (node: SiteNode) =>
		node.name[0].toUpperCase() + node.name.slice(1).replace(/-/g, ' ');

	function getStyle(level: number) {
		return `padding: 5rem 8rem 5rem ${baseIndentation + indentationDelta * level}rem`;
	}
</script>

{#if 'children' in node}
	<div class="folder" data-level={level}>
		<div class="title" {style}>
			{getNodeName(node)}
		</div>
		{#each node.children as child}
			<svelte:self node={child} level={level + 1} />
		{/each}
	</div>
{:else}
	<div class="page">
		<Link variant="block" to="/{node.path}" {style}>
			{node.attributes?.title || getNodeName(node)}
		</Link>

		{#if linkMatchesPath(`/${node.path}`, $page.url.pathname)}
			{#each node.headers ?? [] as header}
				<Link
					variant="block"
					to="/{node.path}#{formatRouteName(header.label)}"
					style={getStyle(level + header.level - 1)}
				>
					<span class="header">
						{header.label}
					</span>
				</Link>
			{/each}
		{/if}
	</div>
{/if}

<style lang="sass">
	.title
		font-weight: bold
		font-size: 17rem
		padding-top: 28rem

	.folder
		margin: 8rem 0

		&:not([data-level="0"])
			> .title
				// font-family: Acherus
				font-size: 14rem
				text-transform: uppercase
				font-weight: normal
				color: var(--pale-text-color)

	.header
		font-size: 14rem
</style>
