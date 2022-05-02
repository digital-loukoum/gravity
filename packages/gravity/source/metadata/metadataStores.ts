import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";

type Store = Record<string, unknown>;

export const servicesStore = new Map<BaseServiceConstructor, Store>();
export const propertiesStore = new Map<
	BaseServiceConstructor,
	Map<string, Store>
>();
