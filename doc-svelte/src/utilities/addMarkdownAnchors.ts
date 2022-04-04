import MagicString from 'magic-string';

export function addMarkdownAnchors(content: string): string {
	const patch = new MagicString(content);

	patch.replace(/^(#{1,6})(.*)$/gm, (match, level, title) => {
		const id = title.trim().replace(/\s+/g, '-').toLowerCase();
		const tag = `h${level.length}`;
		return `<${tag} id="${id}">${title}</${tag}>`;
	});

	return patch.toString();
}
