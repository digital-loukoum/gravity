/**
 * Add a slash at the start and the end of a path
 */
export function normalizePath(path: string) {
	if (!path.endsWith("/")) path += "/";
	return path;
}
