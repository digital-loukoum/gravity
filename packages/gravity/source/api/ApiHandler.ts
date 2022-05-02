export type ApiHandler = (
	service: string,
	target: string,
	properties: string[],
) => unknown;
