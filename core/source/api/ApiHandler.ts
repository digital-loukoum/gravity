export type ApiHandler = (
	service: string,
	target: string,
	properties: unknown[],
) => unknown;
