import { BaseService, type BaseServiceConstructor } from "../index.js";
import { defineMetadata } from "./defineMetadata.js";

const key = Symbol("ContentType");
const { getMetadata: getContentTypeMetadata, setMetadata: setContentTypeMetadata } = defineMetadata<{ [key]: string }>();

/**
 * Built-in decorator that marks the content type of a response.
 * @param contentType The content type of the response, like 'application/pdf' or 'text/plain'.
 * @example ```ts
 * class pdfService extends Service {
 * 	@ContentType("application/pdf")
 * 	function getPdf() {
 * 		// return a pdf as ArrayBuffer or UInt8Array
 * 	}
 * }
 * ```
 */
export function ContentType(contentType: string) {
	return (serviceInstance: BaseService | BaseServiceConstructor, property?: string) => {
		const service = (
			property ? serviceInstance.constructor : serviceInstance
		) as BaseServiceConstructor;

		if (!(service.prototype instanceof BaseService)) {
			return console.warn(`Tag decorators can only be used on services`);
		}

		setContentTypeMetadata({ service, property, key, value: contentType });
	}
}

/**
 * @returns the content type of the given service and path, if any.
 */
export function getContentType(service: BaseServiceConstructor, property: string | undefined): string | undefined {
	return (
		getContentTypeMetadata({ service, key }) ||
		getContentTypeMetadata({ service, property, key })
	);
}
