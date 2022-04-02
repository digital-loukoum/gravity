export function formatRouteName(name: string): string {
	return name.replace(/\s+/g, '-').toLowerCase();
}
