import { proxy } from "../utilities/proxy";

export function apiProxy<
	Handler extends (
		service: string,
		operation: string,
		properties: unknown[],
	) => unknown,
>(handler: Handler): unknown {
	return proxy((service) =>
		proxy((operation) => operationProxy(handler, service, operation)),
	);
}

// recursive proxy that can deal with nested services
function operationProxy<
	Handler extends (
		service: string,
		operation: string,
		properties: unknown[],
	) => unknown,
>(handler: Handler, service: string, operation = ""): unknown {
	return new Proxy(
		(...properties: unknown[]) => handler(service, operation, properties),
		{
			get: (_, property) =>
				operationProxy(handler, service, `${operation}/${String(property)}`),
		},
	);
}
