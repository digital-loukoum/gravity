export function getPathName(url: string) {
	try {
		return new URL(url).pathname;
	} catch (error) {
		return url.startsWith("/") ? url : "/" + url;
	}
}
