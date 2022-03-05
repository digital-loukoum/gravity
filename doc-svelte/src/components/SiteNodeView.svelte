<script lang="ts">
	import type { SiteNode } from 'src/utilities/getSiteNodes';
	export let node: SiteNode;
	export let level = 0;

	$: indentation = 24 + 8 * level;

	const getNodeName = (node: SiteNode) =>
		node.name[0].toUpperCase() + node.name.slice(1).replace(/-/g, ' ');
</script>

{#if 'children' in node}
	<div class="folder">
		<div class="title item" style="padding-left: {indentation}rem;">
			{getNodeName(node)}
		</div>
		{#each node.children as child}
			<svelte:self node={child} level={level + 1} />
		{/each}
	</div>
{:else}
	<div class="page">
		<a class="item" href="/{node.path}" style="padding-left: {indentation}rem;">
			{node.attributes.title || getNodeName(node)}
		</a>
	</div>
{/if}

<style lang="sass">
	.item
		display: block
		padding: 5rem 8rem 5rem 0

		&.title
			font-weight: bold
			font-size: 18rem
			padding-top: 28rem

</style>
