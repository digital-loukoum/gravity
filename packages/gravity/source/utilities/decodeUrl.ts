import { getPathName } from "./getPathName.js";

export function decodeUrl(url: string): string[] {
	return getPathName(url)
		.split("/")
		.map((name) => name.trim())
		.filter((i) => i);
}
