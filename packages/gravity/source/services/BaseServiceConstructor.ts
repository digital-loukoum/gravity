import type { ServiceInterface } from "./ServiceInterface.js";

export type BaseServiceConstructor<Context = any> = new (
	context: Context,
) => ServiceInterface<Context>;
