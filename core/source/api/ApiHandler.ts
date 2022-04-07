export type ApiHandler = (
	service: string,
	path: string[],
	properties: unknown[],
) => unknown;
