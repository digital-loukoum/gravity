import { getPathName } from "./getPathName.js";
import { normalizePath } from "./normalizePath.js";

export function apiMatchesUrl(apiPath: string, url: string) {
	return normalizePath(getPathName(url)).startsWith(getPathName(apiPath));
}
