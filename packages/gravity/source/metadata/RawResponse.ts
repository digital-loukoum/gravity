import { BaseService, type BaseServiceConstructor } from "../index.js";
import { defineMetadata } from "./defineMetadata.js";

const key = Symbol("RawResponse");
const {
	getMetadata: getContentTypeMetadata,
	setMetadata: setContentTypeMetadata,
} = defineMetadata<boolean>();

/**
 * Built-in decorator that indicate the function will not respond via its return value, but a custom system.
 * Typically, it is used when streaming files.
 * This decorator can only be used on functions that return void.
 */
export function RawResponse<Property extends string>(rawMode = true) {
	return (
		serviceInstance: BaseService & {
			[Key in Property]: (...args: any[]) => void;
		},
		property: Property,
	) => {
		const service = serviceInstance.constructor as BaseServiceConstructor;

		if (!(service.prototype instanceof BaseService)) {
			return console.warn(`Tag decorators can only be used on services`);
		}

		setContentTypeMetadata({ service, property, key, value: rawMode });
	};
}

export function isRawResponse(
	service: BaseServiceConstructor,
	property: string,
): boolean {
	return !!getContentTypeMetadata({ service, property, key });
}
