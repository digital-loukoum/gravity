import { getServiceInstance } from "./getServiceInstance.js";

export abstract class BaseService<Context = any> {
	constructor(protected readonly context: Context) {}

	/**
	 * Use this method to call another service from a service.
	 */
	protected useService<Service extends BaseService<Context>>(
		serviceConstructor: new (context: Context) => Service,
	): Service {
		return getServiceInstance(this.context, serviceConstructor);
	}
}

export const baseServiceProperties = Object.getOwnPropertyDescriptors(
	BaseService.prototype,
);
