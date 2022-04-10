import type { BaseServiceConstructor } from "source/services/BaseServiceConstructor.js";

export type AuthorizeOptions<Context> = {
	context: Context;
	service: BaseServiceConstructor;
	path: string[];
};

export type Authorize<Context> = (
	options: AuthorizeOptions<Context>,
) => unknown;
