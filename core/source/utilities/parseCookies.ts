export function parseCookies(cookies: string): { [key: string]: string } {
	const result: { [key: string]: string } = {};
	const pairs = cookies.split(", ");
	for (const pair of pairs) {
		const [key, value] = pair.split("=");
		result[key.trim()] = value;
	}
	return result;
}
