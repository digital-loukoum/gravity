import { GravityError } from "../errors/GravityError";
import { BaseService, baseServiceProperties } from "../services/BaseService";

export function defineGuard<Service extends BaseService<any>>(
	guard: (service: Service) => any,
) {
	return (
		serviceInstance: Service | (new (...args: any[]) => Service),
		operation?: string,
		descriptor?: PropertyDescriptor,
	): any => {
		if (operation) {
			// if we target an operation: we guard the given instance method value
			if (!(serviceInstance instanceof BaseService)) {
				return console.warn(`Guards can only be used on services`);
			}
			if (typeof (serviceInstance as any)[operation] != "function") {
				return console.warn(`A guard can only be used on a service method`);
			}

			descriptor!.value = guardMethod(
				(serviceInstance as any)[operation],
				guard,
			);

			return descriptor;
		} else {
			// if we target a service: we guard the entire prototype
			const service: any = serviceInstance;
			if (!(service.prototype instanceof BaseService)) {
				return console.warn(`Guards can only be used on services`);
			}
			const properties = Object.getOwnPropertyDescriptors(service.prototype);

			for (const propertyKey in properties) {
				// we dismiss base methods (constructor, useService, etc...)
				if (propertyKey in baseServiceProperties()) continue;

				const property = properties[propertyKey];

				if (typeof property.value == "function")
					property.value = guardMethod(property.value, guard);
				else if (typeof property.get?.() == "function")
					property.get = guardMethod(property.get, guard);

				Object.defineProperty(service.prototype, propertyKey, property);
			}
		}
	};
}

function guardMethod<Service extends BaseService<any>>(
	method: Function,
	guard: (service: Service) => any,
) {
	return function (this: Service, ...args: any) {
		const guardResult = guard(this);
		if (
			guardResult &&
			typeof guardResult == "object" &&
			typeof guardResult.then == "function"
		) {
			throw new GravityError("gravity/guards-cannot-be-asynchronous", {
				status: 500,
			});
		}
		return method.call(this, ...args);
	};
}
