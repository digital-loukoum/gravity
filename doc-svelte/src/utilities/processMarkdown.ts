import MarkdownIt from 'markdown-it';
import { markdownItShikiTwoslashSetup } from 'markdown-it-shiki-twoslash';
import { addMarkdownAnchors } from './addMarkdownAnchors';

const shiki = markdownItShikiTwoslashSetup({
	theme: 'dracula'
});

export async function processMarkdown(content: string): Promise<string> {
	content = addMarkdownAnchors(content);
	return MarkdownIt({ html: true })
		.use(await shiki)
		.render(content);
}
