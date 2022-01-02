import { BaseServiceConstructor } from "../services/BaseServiceConstructor";

type Store = Record<string, unknown>;

export const servicesStore = new Map<BaseServiceConstructor, Store>();
export const operationsStore = new Map<
	BaseServiceConstructor,
	Map<string, Store>
>();
