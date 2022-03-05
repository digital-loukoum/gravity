<script context="module" lang="ts">
	import { getVersion } from 'src/utilities/getVersion';
	import { getSiteNodes, type SiteNode } from 'src/utilities/getSiteNodes';

	export async function load() {
		return {
			props: {
				version: getVersion(),
				siteNodes: getSiteNodes()
			}
		};
	}
</script>

<script lang="ts">
	import Header from 'src/components/Header.svelte';
	import Main from 'src/components/Main.svelte';
	import SideBar from 'src/components/SideBar.svelte';

	export let version: string;
	export let siteNodes: Array<SiteNode>;
</script>

<Header {version} />
<SideBar {siteNodes} />
<Main>
	<slot />
</Main>

<style lang="sass">
	@font-face
		font-family: Readex
		src: url('/ReadexProFont/ReadexPro-Medium.ttf')

	:global(:root)
		--header-height: 58rem
		--sidebar-width: 320rem
		--background-color: white
		--border-color: rgba(60, 60, 67, .12)
		--text-color: #2c3e50
		--primary-color: #fd5591

	:global(html)
		font-size: 1px
	
	:global(body)
		font-size: 16rem
		font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif
		line-height: 1.5
		color: #333
		color: var(--text-color)
	
	:global(html, body)
		margin: 0

	:global(*)
		box-sizing: border-box

	:global(h1, h2, h3, h4, h5, h6)
		margin: 0 0 0.5em 0
		font-weight: 400
		line-height: 1.2

	:global(h1)
		font-size: 2em
	
	:global(a)
		color: inherit
		text-decoration: none
		position: relative
		&:hover
			color: var(--primary-color)

	:global(code)
		font-family: menlo, inconsolata, monospace
		font-size: calc(1em - 2px)
		color: #555
		background-color: #f0f0f0
		padding: 0.2em 0.4em
		border-radius: 2px
</style>
