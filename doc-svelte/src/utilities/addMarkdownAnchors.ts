import MagicString from 'magic-string';

export function addMarkdownAnchors(content: string): string {
	const patch = new MagicString(content);

	patch.replace(/^(#{1,6})\s*(.*)\s*$/gm, (_, level, title) => {
		const id = title.replace(/\s+/g, '-').toLowerCase();
		const tag = `h${level.length}`;
		return `<${tag} id="${id}">${title}</${tag}>`;
	});

	return patch.toString();
}
