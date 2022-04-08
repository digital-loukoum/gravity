import type { BaseService } from "./BaseService";
import type { BaseServiceConstructor } from "./BaseServiceConstructor";

export const servicesByContext = new WeakMap<
	any,
	WeakMap<BaseServiceConstructor, BaseService<any>>
>();
