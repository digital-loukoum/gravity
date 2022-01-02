import type { BaseServiceConstructor } from "../services/BaseServiceConstructor";

export type GravityAuthorizeFunction<Context = unknown> = (call: {
	service: BaseServiceConstructor;
	operation: string;
	context: Context;
}) => any;
