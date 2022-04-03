<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const documentationMap = await (await fetch('/documentation/map.json')).json();

		return {
			props: {
				documentationMap
			}
		};
	};
</script>

<script lang="ts">
	import SideBar from 'src/components/SideBar.svelte';
	import type { SiteMap } from 'src/utilities/getSiteMap';

	export let documentationMap: SiteMap;
</script>

<div class="content">
	<SideBar {documentationMap} />
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
