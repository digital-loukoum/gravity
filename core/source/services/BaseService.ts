export abstract class BaseService<Context = any> {
	constructor(public context: Context) {}

	/**
	 * Use this function to call another service from a service.
	 */
	useService<Service>(
		serviceConstructor: new (context: Context) => Service
	): () => Service {
		let service: null | Service = null
		return () => (service ??= new serviceConstructor(this.context))
	}
}
