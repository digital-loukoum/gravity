import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import { BaseService } from "../services/BaseService.js";
import { defineMetadata } from "./defineMetadata.js";

export function defineTag(
	name = "",
): [
	(service: BaseService | BaseServiceConstructor, operation?: string) => any,
	(service: BaseServiceConstructor, operation?: string) => boolean,
] {
	const key = Symbol(name);
	const { getMetadata, setMetadata } = defineMetadata<{ [key]: true }>();

	return [
		(serviceInstance, operation) => {
			const service = (
				operation ? serviceInstance.constructor : serviceInstance
			) as BaseServiceConstructor;

			if (!(service.prototype instanceof BaseService)) {
				return console.warn(`Tag decorators can only be used on services`);
			}
			if (
				operation &&
				typeof (serviceInstance as any)[operation] != "function"
			) {
				return console.warn(
					`Tag decorators can only be used on a service method`,
				);
			}

			setMetadata({ service, operation, key, value: true });
		},
		(service, operation): boolean => {
			return (
				!!getMetadata({ service, key }) ||
				!!getMetadata({ service, operation, key })
			);
		},
	];
}
