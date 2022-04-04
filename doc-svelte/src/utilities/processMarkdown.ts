import { addMarkdownAnchors } from './addMarkdownAnchors';
import remarkShikiTwoslashImport from 'remark-shiki-twoslash';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { remark } from 'remark';

const remarkShikiTwoslash =
	typeof remarkShikiTwoslashImport == 'function'
		? remarkShikiTwoslashImport
		: ((remarkShikiTwoslashImport as any).default as typeof remarkShikiTwoslashImport);

const shikiTwoSlash = remarkShikiTwoslash({
	theme: 'dracula'
});

export async function processMarkdown(content: string): Promise<string> {
	content = addMarkdownAnchors(content);

	const markdownAST = remark().parse(content);
	await shikiTwoSlash(markdownAST);
	const hAST = toHast(markdownAST, { allowDangerousHtml: true });
	const html = hAST ? toHtml(hAST, { allowDangerousHtml: true }) : '';

	return html;
}
