export function getCacheKey(service: string, target: string): string {
	return `${service}/${target}`;
}
