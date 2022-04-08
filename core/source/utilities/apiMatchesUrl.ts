import { normalizePath } from "./normalizePath";

export function apiMatchesUrl(apiPath: string, url: string) {
	return normalizePath(url).startsWith(apiPath);
}
