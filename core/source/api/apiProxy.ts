import { proxy } from "../utilities/proxy";

export function apiProxy<
	Handler extends (
		service: string,
		operation: string,
		properties: unknown[],
	) => unknown,
>(handler: Handler) {
	return proxy((service) =>
		proxy(
			(operation) =>
				(...properties: unknown[]) =>
					handler(service, operation, properties),
		),
	);
}
