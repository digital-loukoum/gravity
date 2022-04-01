<script lang="ts">
	import type { SiteNode } from 'src/utilities/getSiteNodes';
	import Link from './Link.svelte';
	export let node: SiteNode;
	export let level = 0;

	$: indentation = 24 + 8 * level;
	$: style = `padding: 5rem 8rem 5rem ${indentation}rem`;

	const getNodeName = (node: SiteNode) =>
		node.name[0].toUpperCase() + node.name.slice(1).replace(/-/g, ' ');
</script>

{#if 'children' in node}
	<div class="folder">
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
		font-size: 18rem
		padding-top: 28rem

	.folder
		margin: 8rem 0
</style>
