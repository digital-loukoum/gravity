import type { SiteFile, SiteMap, SiteNode } from './getSiteMap';

/**
 * Find the first site file in the given map
 */
export function findLastSiteFile(map: SiteMap): SiteFile | undefined {
	let node: SiteNode | undefined = undefined;
	while ((node = map[map.length - 1]) && 'children' in node) map = node.children;
	return node;
}
