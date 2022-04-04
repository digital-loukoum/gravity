import { addMarkdownAnchors } from './addMarkdownAnchors';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { remark } from 'remark';

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
