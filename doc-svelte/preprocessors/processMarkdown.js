import MarkdownIt from 'markdown-it';
import { markdownItShikiTwoslashSetup } from 'markdown-it-shiki-twoslash';

const shiki = markdownItShikiTwoslashSetup({
	theme: 'nord'
});

export const processMarkdown = () => ({
	markup: async ({ content, filename }) => {
		console.log('filename', filename);
		if (!filename.endsWith('.md')) return;

		const code = MarkdownIt({ html: true })
			.use(await shiki)
			.render(content)
			.replace(/{/g, '\\{');

		console.log('code', code);

		return { code };
	}
});
