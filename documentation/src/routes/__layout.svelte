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
	import GravityIcon from 'src/components/GravityIcon.svelte';
	import Link from 'src/components/Link.svelte';
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

<Header {version} />

<KitDocs {meta}>
	<KitDocsLayout navbar={false} {sidebar}>
		<div class="logo" slot="navbar-left">
			<GravityIcon />

			<Link variant="underline" to="/">
				<span class="title"> Gravity </span>
			</Link>
			<Link
				to="https://github.com/digital-loukoum"
				style="
					margin-left: 12px;
					font-family: Simplicity;
					font-size: 18px;
					top: 1px;
					letter-spacing: 1.4px;
				"
			>
				<span style="margin-right: 4px; position: relative;">by Digital Loukoums</span>
				<img src="/loukoums.png" alt="digital-loukoums-logo" width="36" height="36" />
			</Link>
		</div>

		<slot />
	</KitDocsLayout>
</KitDocs>
