export function formatRouteName(name: string): string {
	return name.replace(/\s+/g, '-').replace(/\?/g, '').toLowerCase();
}