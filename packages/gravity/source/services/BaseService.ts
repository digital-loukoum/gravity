import { getServiceInstance } from "./getServiceInstance.js";
import type { ServiceInterface } from "./ServiceInterface.js";

export abstract class BaseService<Context = any>
	implements ServiceInterface<Context>
{
	constructor(
		public readonly context: Context,
		public readonly request: Request,
		public readonly response: Response,
	) {}

	/**
	 * Use this method to call another service from a service.
	 */
	protected useService<Service extends { context: Context }>(
		serviceConstructor: new (context: Context) => Service,
	): Service {
		return getServiceInstance(this.context, serviceConstructor);
	}
}

export const baseServiceProperties = Object.getOwnPropertyDescriptors(
	BaseService.prototype,
);
