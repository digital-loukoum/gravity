import { BaseService } from "../services/BaseService";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";

export function defineGuard<Context = undefined>(
	guard: (context: Context) => any,
) {
	return (
		serviceInstance: BaseService | BaseServiceConstructor,
		operation?: string,
		descriptor?: PropertyDescriptor,
	) => {
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
			for (const method in service.prototype) {
				if (typeof method == "function") {
					service.prototype[method] = guardMethod(
						service.prototype[method],
						guard,
					);
				}
			}
		}
	};
}

function guardMethod<Context>(
	method: Function,
	guard: (context: Context) => any,
) {
	return function (this: { context: Context }, ...args: any) {
		const guardResult = guard(this.context);
		if (
			guardResult &&
			typeof guardResult == "object" &&
			typeof guardResult.then == "function"
		) {
			// TODO: catch error
			throw `Guard decorators should not be asynchronous`;
		}
		return method.call(this, ...args);
	};
}
