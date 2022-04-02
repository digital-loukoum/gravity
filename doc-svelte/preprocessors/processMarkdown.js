import MarkdownIt from 'markdown-it';
import { markdownItShikiTwoslashSetup } from 'markdown-it-shiki-twoslash';

const shiki = markdownItShikiTwoslashSetup({
	theme: 'dracula'
});

export const processMarkdown = () => ({
	markup: async ({ content, filename }) => {
		if (!filename.endsWith('.md')) return;

		const code = MarkdownIt({ html: true })
			.use(await shiki)
			.render(content)
			.replace(/{/g, '&lbrace;')
			.replace(/}/g, '&rbrace;');

		return { code };
	}
});
