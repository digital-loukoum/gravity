import { assertNotPromise } from "../utilities/assertNotPromise.js";

export function defineGuard<Service>(guard: (service: Service) => any) {
	return (
		service: Service,
		property?: string,
		descriptor?: PropertyDescriptor,
	): any => {
		// if we target an property: we guard the given instance method value
		if (!descriptor) {
			let value: unknown = undefined;
			descriptor = {
				set: (newValue: unknown) => (value = newValue),
				get(this: Service) {
					assertNotPromise(guard(this));
					return value;
				},
				enumerable: true,
				configurable: true,
			};
		} else if (typeof descriptor.get == "function") {
			descriptor.get = guardProperty(descriptor.get, guard);
		} else {
			descriptor.value = guardProperty(descriptor.value, guard);
		}

		return descriptor;
	};
}

function guardProperty<Service>(
	property: unknown,
	guard: (service: Service) => any,
) {
	return function (this: Service, ...args: any) {
		assertNotPromise(guard(this));
		return typeof property == "function"
			? property.call(this, ...args)
			: property;
	};
}
