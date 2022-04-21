<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { findFirstSiteFile } from 'src/utilities/findFirstSiteFile';

	export const load: Load = async ({ fetch }) => {
		const map = await (await fetch(`/documentation/map.json`)).json();
		const siteFile = findFirstSiteFile(map);

		if (!siteFile) {
			return {
				status: 404
			};
		}

		return {
			status: 302,
			redirect: siteFile.path
		};
	};
</script>
