import fs from 'fs';
import { join, extname } from 'path';
import yaml from 'js-yaml';

const routesDirectory = 'src/routes';

export type SiteNode = SiteFile | SiteDirectory;

export type Header = {
	level: number;
	label: string;
};

export type BaseSiteNode = {
	name: string;
	parent: string;
	path: string;
};

export type SiteFile = BaseSiteNode & {
	extension: string;
	attributes?: Record<string, unknown>;
	headers?: Array<Header>;
};

export type SiteDirectory = BaseSiteNode & {
	children: Array<SiteNode>;
};

export class MarkdownContent {
	attributes: Record<string, unknown> = {};
	body = '';
}

/**
 * Read all site nodes (directory and files) inside the "src/routes" directory
 * A site node can either be a directory or a file (markdown or regular svelte)
 */
export function getSiteNodes(parent = ''): Array<SiteNode> {
	const nodes: Array<SiteNode> = [];
	const children = getNodesOrder(parent);

	for (const child of children) {
		const childPath = join(parent, child);
		const filePath = join(routesDirectory, childPath);

		if (fs.statSync(filePath).isDirectory()) {
			nodes.push({
				name: child,
				parent,
				path: childPath,
				children: getSiteNodes(childPath)
			});
		} else {
			const extension = extname(child);
			const node: SiteFile = {
				name: child.slice(0, -extension.length),
				parent,
				path: childPath.slice(0, -extension.length),
				extension
			};

			if (extension == '.md') {
				const content = fs.readFileSync(filePath, 'utf-8');
				const { attributes, body } = parseMarkdown(content);
				node.attributes = attributes;
				node.headers = getMarkdownHeaders(body);
			}

			nodes.push(node);
		}
	}

	return nodes;
}

/**
 * Return all heeaders h1, h2, ..., h6 from a markdown content
 */
function getMarkdownHeaders(content: string): Array<Header> {
	const headers: Array<Header> = [];
	const anchorExpression = /^(#+)\s*(.*?)\s*$/gm;
	let match: RegExpMatchArray;

	while ((match = anchorExpression.exec(content))) {
		const { 1: level, 2: label } = match;
		headers.push({
			level: level.length,
			label
		});
	}

	return headers;
}

/**
 * Parse a markdown content and return the frontmatter as well as the body
 */
function parseMarkdown(content: string): MarkdownContent {
	const result = new MarkdownContent();
	const frontMatterMatch = content.match(/^\s*---(.*?)\n---(.*?)/);
	if (frontMatterMatch) {
		const { 1: frontMatter, 2: body } = frontMatterMatch;
		result.attributes = yaml.load(frontMatter.trim()) as Record<string, unknown>;
		result.body = body.trim();
	} else {
		result.body = content;
	}
	return result;
}

/**
 * Return the ordered list of items from
 */
function getNodesOrder(directory = ''): Array<string> {
	const orderFilePath = join(routesDirectory, directory, '_order.yaml');
	if (!fs.existsSync(orderFilePath)) {
		console.warn(`Missing '_order.yaml' file in directory '${routesDirectory}/${directory}'`);
		return [];
	}
	const order = yaml.load(fs.readFileSync(orderFilePath, 'utf-8'));
	return order as Array<string>;
}
