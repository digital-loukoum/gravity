import type { BaseService } from "./BaseService.js";

export type BaseServiceConstructor<Context = any> = new (
	context: Context,
) => BaseService<Context>;
