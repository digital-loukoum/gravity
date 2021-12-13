/**
 * Add a slash at the start and the end of a path
 */
export function normalizePath(path: string) {
	if (path[0] != "/") path = "/" + path
	if (!path.endsWith("/")) path += "/"
	return path
}