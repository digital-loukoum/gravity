import type { BaseServiceConstructor } from "./BaseServiceConstructor.js";
import type { ServiceInterface } from "./ServiceInterface.js";

export const servicesByContext = new WeakMap<
	any,
	WeakMap<BaseServiceConstructor, ServiceInterface<any>>
>();
