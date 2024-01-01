import { BaseService, type BaseServiceConstructor } from "../index.js";
import { defineMetadata } from "./defineMetadata.js";

const key = Symbol("RawRequest");
const {
	getMetadata: getContentTypeMetadata,
	setMetadata: setContentTypeMetadata,
} = defineMetadata<boolean>();

/**
 * Built-in decorator that indicates to not parse the request by the default parser.
 * You have to add the request object to the context yourself.
 * This decorator can only be used on functions with no parameters, as the will be retrieved from the request in a custom way.
 */
export function RawRequest<Property extends string>(rawMode = true) {
	return (
		serviceInstance: BaseService & { [Key in Property]: () => any },
		property: Property,
	) => {
		const service = serviceInstance.constructor as BaseServiceConstructor;

		if (!(service.prototype instanceof BaseService)) {
			return console.warn(`Tag decorators can only be used on services`);
		}

		setContentTypeMetadata({ service, property, key, value: rawMode });
	};
}

export function isRawRequest(
	service: BaseServiceConstructor,
	property: string,
): boolean {
	return !!getContentTypeMetadata({ service, property, key });
}
