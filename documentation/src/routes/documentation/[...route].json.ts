import { findFirstSiteFile } from 'src/utilities/findFirstSiteFile';
import { findSiteNode } from 'src/utilities/findSiteNode';
import { getSiteMap } from 'src/utilities/getSiteMap';
import { processMarkdown } from 'src/utilities/processMarkdown';

export const get = async ({ params }: { params: Record<string, string> }) => {
	const { route } = params;
	const map = await getSiteMap('documentation');
	let siteNode = findSiteNode(map, `documentation/${route}`);

	if (siteNode && 'children' in siteNode) {
		siteNode = findFirstSiteFile(siteNode.children);
	}

	return {
		body: {
			siteNode,
			html: siteNode ? await processMarkdown(siteNode.content) : ''
		}
	};
};
