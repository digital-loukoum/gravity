import type { SiteMap, SiteNode } from './getSiteMap';

/**
 * Find the first site file in the given map
 */
export function findFirstSiteFile(map: SiteMap): SiteNode | undefined {
	let node: SiteNode | undefined = undefined;
	while ((node = map[0]) && 'children' in node) map = node.children;
	return node;
}
