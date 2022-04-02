import MagicString from 'magic-string';

export const addMarkdownAnchors = () => ({
	markup: ({ content, filename }) => {
		if (!filename.endsWith('.md')) return;

		const patch = new MagicString(content, filename);

		patch.replace(/^(#{1,6})\s*(.*)\s*$/gm, (_, level, title) => {
			const id = title.replace(/\s+/g, '-').toLowerCase();
			const tag = `h${level.length}`;
			return `<${tag} id="${id}">${title}</${tag}>`;
		});

		return { code: patch.toString(), map: patch.generateMap() };
	}
});
