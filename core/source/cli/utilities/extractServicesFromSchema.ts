import { baseServiceProperties } from "../../services/BaseService";
import { Type } from "typezer/library/types/Type/Type";

/**
 * Cleanly extract all services from a given schema.
 * Remove private and protected properties and methods.
 * Remove methods from the BaseService prototype.
 */
export function extractServicesFromSchema(
	schema: Record<string, Type>,
): Record<string, Type> {
	if (schema.services?.typeName !== "Object") {
		throw new Error(`Expected services to be an object`);
	}
	const services: Record<string, Type> = {};

	for (const [serviceName, service] of Object.entries(
		schema.services.properties,
	)) {
		if ("properties" in service) {
			const cleanType = {} as Type;
			for (const [key, type] of Object.entries(service.properties)) {
				console.log("key", key);
				console.log("type", type);
				if (
					!(
						key.startsWith("_") ||
						key.startsWith("#") ||
						type?.modifiers?.includes("private") ||
						type?.modifiers?.includes("protected") ||
						key in baseServiceProperties
					)
				) {
					// @ts-ignore
					cleanType[key] = type[key];
				}
			}
			services[serviceName] = cleanType;
		} else {
			services[serviceName] = service;
		}
	}

	return services;
}
