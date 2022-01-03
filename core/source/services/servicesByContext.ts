import { BaseService } from "./BaseService";
import { BaseServiceConstructor } from "./BaseServiceConstructor";

export const servicesByContext = new WeakMap<
	any,
	WeakMap<BaseServiceConstructor, BaseService<any>>
>();
