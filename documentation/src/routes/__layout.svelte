<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async (options) => {
		const version = await (await options.fetch('/version')).text();
		const kit = await createKitDocsLoader({
			sidebar: { '/docs': '/docs' }
		})(options);

		return {
			props: {
				version,
				...kit.props
			}
		};
	};
</script>

<script lang="ts">
	import '@svelteness/kit-docs/client/polyfills/index.js';
	import '@svelteness/kit-docs/client/styles/normalize.css';
	import '@svelteness/kit-docs/client/styles/fonts.css';
	import '@svelteness/kit-docs/client/styles/theme.css';
	import '$lib/styles/kit-docs.css';
	import '$lib/styles/kit-docs.patch.css';
	import '$lib/styles/global.css';

	import { page } from '$app/stores';

	import {
		KitDocs,
		KitDocsLayout,
		createKitDocsLoader,
		createSidebarContext,
		type SidebarLinks
	} from '@svelteness/kit-docs';
	import Header from 'src/components/Header.svelte';
	import type { MarkdownFrontmatter, MarkdownHeader } from '@svelteness/kit-docs/node';

	export let meta: null | {
		title: string;
		description: string;
		excerpt: string;
		headers: MarkdownHeader[];
		frontmatter: MarkdownFrontmatter;
		lastUpdated: number;
		slug: string;
	} = null;

	export let sidebar: null | {
		baseUrl?: string | undefined;
		links: SidebarLinks;
	} = null;
	export let version = '?';

	export let navbar = {
		links: [
			{
				title: 'Documentation',
				slug: '/docs'
			},
			{
				title: 'Changelog',
				slug: '/changelog'
			},
			{
				title: 'Github',
				slug: 'https://github.com/digital-loukoum/gravity'
			}
		]
	};

	const { activeCategory } = createSidebarContext(sidebar);

	$: category = $activeCategory ? `${$activeCategory}: ` : '';
	$: title = (category && meta && `${category}${meta.title ?? ''} | Gravity`) || 'Gravity';
	$: description = meta?.description;
</script>

<svelte:head>
	{#key $page.url.pathname}
		<title>{title}</title>
		{#if description}
			<meta name="description" content={description} />
		{/if}
	{/key}
</svelte:head>

<div class:index={$page.url.pathname == '/'}>
	<KitDocs {meta}>
		<KitDocsLayout {navbar} {sidebar}>
			<Header {version} slot="navbar-left" />
			<slot />
		</KitDocsLayout>
	</KitDocs>
</div>

<style lang="sass">
	.index :global(.on-this-page)
		display: none
</style>
