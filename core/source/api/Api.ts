import type {
	BaseService,
	BaseServiceConstructor,
} from "../services/BaseService";
import type { Instance } from "../types/Instance";
import { Promisify } from "../types/Promisify";

type DefineApi<Service extends BaseService> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (...args: Parameters<Service[Key]>) => Promisify<ReturnType<Service[Key]>>
		: never;
};

export type Api<Services extends Record<string, BaseServiceConstructor>> = {
	[Key in keyof Services]: DefineApi<Instance<Services[Key]>>;
};
