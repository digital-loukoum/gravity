import MagicString from 'magic-string';

export const addMarkdownAnchors = () => ({
	markup: ({ content, filename }) => {
		if (!filename.endsWith('.md')) return;

		const patch = new MagicString(content, filename);

		patch.replace(
			/^#{1,6}\s*(.*)\s*$/gm,
			(match, title) => `<a name="${title.replace(/\s+/g, '-').toLowerCase()}"></a>\n\n${match}`
		);

		return { code: patch.toString(), map: patch.generateMap() };
	}
});
