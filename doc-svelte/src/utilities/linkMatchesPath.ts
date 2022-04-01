export function linkMatchesPath(link: string, path: string) {
	if (link == '/') return path == '/';
	if (!link.endsWith('/')) link += '/';
	if (!path.endsWith('/')) path += '/';
	return path.startsWith(link);
}
