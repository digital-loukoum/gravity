import type { BaseService } from "./BaseService";

export type BaseServiceConstructor<Context = any> = new (
	context: Context,
	...args: any[]
) => BaseService<Context>;
