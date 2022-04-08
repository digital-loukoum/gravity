import type { BaseService } from "./BaseService";
import type { BaseServiceConstructor } from "./BaseServiceConstructor";

export const useService =
	<Service extends BaseService<any>>(service: BaseServiceConstructor) =>
	(
		_serviceInstance: Service,
		_operation?: string,
		_descriptor?: PropertyDescriptor,
	): any => {
		const property: PropertyDescriptor = {
			configurable: false,
			enumerable: false,
			get(this: BaseService<unknown>) {
				return this.useService(service);
			},
		};
		return property;
	};

export const UseService = useService;
