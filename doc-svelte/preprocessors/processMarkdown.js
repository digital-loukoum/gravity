import remarkShikiTwoslash from 'remark-shiki-twoslash';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { remark } from 'remark';

const shikiTwoSlash = remarkShikiTwoslash.default({
	theme: 'dracula',
	langs: ['html', 'css', 'javascript', 'svelte', 'vue']
});

export const processMarkdown = () => ({
	markup: async ({ content, filename }) => {
		if (!filename.endsWith('.md')) return;

		const markdownAST = remark().parse(content);
		await shikiTwoSlash(markdownAST);
		const hAST = toHast(markdownAST, { allowDangerousHtml: true });
		const code = hAST ? toHtml(hAST, { allowDangerousHtml: true }) : '';

		return { code };
	}
});
