import { BaseService } from "./BaseService";
import { BaseServiceConstructor } from "./BaseServiceConstructor";
import { servicesByContext } from "./servicesByContext";

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
