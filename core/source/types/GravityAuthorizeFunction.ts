import type { BaseServiceConstructor } from "../services";

export type GravityAuthorizeFunction = (call: {
	service: BaseServiceConstructor;
	operation: string;
	context: unknown;
}) => any;
