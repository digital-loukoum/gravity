import { memoize } from "../utilities/memoize";

export abstract class BaseService<Context = any> {
	constructor(public context: Context) {}

	/**
	 * Use this function to call another service from a service.
	 */
	protected useService<Service>(
		serviceConstructor: new (context: Context) => Service,
	): () => Service {
		let service: null | Service = null;
		return () => (service ??= new serviceConstructor(this.context));
	}
}

export const baseServiceProperties = memoize(() =>
	Object.getOwnPropertyDescriptors(BaseService.prototype),
);
