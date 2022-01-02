import { BaseService, BaseServiceConstructor } from "../services";

export type Guard<Context = undefined> = (context: Context) => any;

export function defineGuard<Context = undefined>(guard: Guard<Context>) {
	return (
		serviceInstance: BaseService | BaseServiceConstructor,
		operation?: string,
	) => {
		if (operation) {
			// if we target an operation: we guard the given instance method value
			const service: any = serviceInstance.constructor;
			if (!(serviceInstance instanceof BaseService)) {
				return console.warn(`Guards can only be used on services`);
			}
			if (typeof (serviceInstance as any)[operation] != "function") {
				return console.warn(`A guard can only be used on a service method`);
			}
			service[operation] = guardMethod(service[operation], guard);
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

function guardMethod<Context>(method: Function, guard: Guard<Context>) {
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
