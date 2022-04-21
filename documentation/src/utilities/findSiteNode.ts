import type { SiteMap, SiteNode } from './getSiteMap';

/**
 * Find a site node in the given site map
 */
export function findSiteNode(map: SiteMap, path: string): SiteNode | undefined {
	for (const node of map) {
		if (node.path == path) return node;
		else if (path.startsWith(node.path) && 'children' in node) {
			return findSiteNode(node.children, path);
		}
	}
}
