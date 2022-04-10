import { normalizePath } from "./normalizePath.js";

export function apiMatchesUrl(apiPath: string, url: string) {
	return normalizePath(url).startsWith(apiPath);
}
