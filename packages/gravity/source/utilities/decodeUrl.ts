export function decodeUrl(url: string): string[] {
	return url
		.split("/")
		.map((name) => name.trim())
		.filter((i) => i);
}
