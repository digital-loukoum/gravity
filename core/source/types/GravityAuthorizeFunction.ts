import type { BaseServiceConstructor } from "../services/BaseServiceConstructor";

export type GravityAuthorizeFunction<Context = unknown> = (call: {
	context: Context;
	service: BaseServiceConstructor;
	path: string[];
}) => any;
