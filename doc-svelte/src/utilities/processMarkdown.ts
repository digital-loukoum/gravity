import withShiki from '@stefanprobst/remark-shiki';
import fromMarkdown from 'remark-parse';
import * as shiki from 'shiki';
import { unified } from 'unified';
import toHast from 'remark-rehype';
import withHtmlInMarkdown from 'rehype-raw';
import toHtml from 'rehype-stringify';
import { addMarkdownAnchors } from './addMarkdownAnchors';

async function createProcessor() {
	const highlighter = await shiki.getHighlighter({ theme: 'dracula' });

	const processor = unified()
		.use(fromMarkdown)
		.use(withShiki, { highlighter })
		.use(toHast, { allowDangerousHtml: true })
		.use(withHtmlInMarkdown)
		.use(toHtml);

	return processor;
}

const processor = createProcessor();

export async function processMarkdown(content: string): Promise<string> {
	content = addMarkdownAnchors(content);
	const result = (await processor).process(content);
	return String(await result);
}
