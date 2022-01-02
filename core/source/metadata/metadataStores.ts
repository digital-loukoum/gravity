import { BaseServiceConstructor } from "../services";

type Store = Record<string, unknown>;

export const servicesStore = new Map<BaseServiceConstructor, Store>();
export const operationsStore = new Map<
	BaseServiceConstructor,
	Map<string, Store>
>();
