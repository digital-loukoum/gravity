export type ApiHandler = (
	service: string,
	operation: string,
	properties: unknown[],
) => unknown;
