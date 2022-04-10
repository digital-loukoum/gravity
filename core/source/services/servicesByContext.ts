import type { BaseService } from "./BaseService.js";
import type { BaseServiceConstructor } from "./BaseServiceConstructor.js";

export const servicesByContext = new WeakMap<
	any,
	WeakMap<BaseServiceConstructor, BaseService<any>>
>();
