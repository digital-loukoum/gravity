<script lang="ts">
	import type { SiteNode } from 'src/utilities/getSiteNodes';
	import Link from './Link.svelte';
	export let node: SiteNode;
	export let level = 0;

	const baseIndentation = 24;
	const indentationDelta = 20;

	$: indentation = baseIndentation + indentationDelta * level;
	$: style = `padding: 5rem 8rem 5rem ${indentation}rem`;

	const getNodeName = (node: SiteNode) =>
		node.name[0].toUpperCase() + node.name.slice(1).replace(/-/g, ' ');
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
			{node.attributes.title || getNodeName(node)}
		</Link>
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
</style>
