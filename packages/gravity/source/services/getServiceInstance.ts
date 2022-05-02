import type { BaseService } from "./BaseService.js";
import type { BaseServiceConstructor } from "./BaseServiceConstructor.js";
import { servicesByContext } from "./servicesByContext.js";

export function getServiceInstance<
	Context,
	Service extends BaseService<Context>,
>(
	context: Context,
	serviceConstructor: BaseServiceConstructor<Context>,
): Service {
	let contextServices = servicesByContext.get(context);
	if (!contextServices) {
		servicesByContext.set(context, (contextServices = new WeakMap()));
	}

	let service = contextServices.get(serviceConstructor);
	if (!service) {
		contextServices.set(
			serviceConstructor,
			(service = new serviceConstructor(context)),
		);
	}

	return service as Service;
}
