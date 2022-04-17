import { baseServiceProperties } from "../../services/BaseService.js";
import type { Type } from "typezer";

/**
 * Cleanly extract all services from a given schema.
 * Remove private and protected properties and methods.
 * Remove methods from the BaseService prototype.
 */
export function extractServicesFromSchema(
	schema: Record<string, Type>,
): Record<string, Type> {
	if (!schema.services) {
		throw new Error(`Missing exported variable 'service'`);
	}
	if (schema.services.typeName !== "Object") {
		throw new Error(`Expected services to be an object`);
	}
	const services: Record<string, Type> = {};

	for (const [serviceName, service] of Object.entries(
		schema.services.properties,
	)) {
		if ("properties" in service) {
			const cleanType = {} as Type;
			for (const [key, property] of Object.entries(service.properties)) {
				if (
					!(
						key == "context" ||
						key.startsWith("_") ||
						key.startsWith("#") ||
						property?.modifiers?.includes("private") ||
						property?.modifiers?.includes("protected") ||
						key in baseServiceProperties
					)
				) {
					// @ts-ignore
					cleanType[key] = service.properties[key];
				}
			}
			services[serviceName] = cleanType;
		} else {
			services[serviceName] = service;
		}
	}

	return services;
}
