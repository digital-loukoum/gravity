import { normalizePath } from "./normalizePath.js";

function getPathName(url: string) {
	try {
		return new URL(url).pathname;
	} catch (error) {
		return url.startsWith("/") ? url : "/" + url;
	}
}

export function apiMatchesUrl(apiPath: string, url: string) {
	return normalizePath(getPathName(url)).startsWith(getPathName(apiPath));
}
