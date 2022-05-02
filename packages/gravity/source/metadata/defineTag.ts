import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import { BaseService } from "../services/BaseService.js";
import { defineMetadata } from "./defineMetadata.js";

export function defineTag(
	name = "",
): [
	(service: BaseService | BaseServiceConstructor, property?: string) => any,
	(service: BaseServiceConstructor, property?: string) => boolean,
] {
	const key = Symbol(name);
	const { getMetadata, setMetadata } = defineMetadata<{ [key]: true }>();

	return [
		(serviceInstance, property) => {
			const service = (
				property ? serviceInstance.constructor : serviceInstance
			) as BaseServiceConstructor;

			if (!(service.prototype instanceof BaseService)) {
				return console.warn(`Tag decorators can only be used on services`);
			}

			setMetadata({ service, property, key, value: true });
		},
		(service, property): boolean => {
			return (
				!!getMetadata({ service, key }) ||
				!!getMetadata({ service, property, key })
			);
		},
	];
}
