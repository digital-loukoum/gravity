import withShiki from '@stefanprobst/remark-shiki';
import fromMarkdown from 'remark-parse';
import * as shiki from 'shiki';
import { unified } from 'unified';
import toHast from 'remark-rehype';
import withHtmlInMarkdown from 'rehype-raw';
import toHtml from 'rehype-stringify';

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

export const processMarkdown = () => ({
	markup: async ({ content, filename }) => {
		if (!filename.endsWith('.md')) return;

		const result = (await processor).process(content);
		const code = String(await result);

		return { code };
	}
});
