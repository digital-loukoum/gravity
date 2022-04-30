import type { BaseService } from "./BaseService.js";

export type BaseServiceConstructor<Context> = new (
	context: Context,
) => BaseService<Context>;
