import { proxy } from "../utilities/proxy";
import { ApiHandler } from "./ApiHandler";

export function apiProxy<Result = unknown>(handler: ApiHandler): Result {
	return proxy<Result>((service) =>
		proxy((operation) => operationProxy(handler, service, operation)),
	);
}

// recursive proxy that can deal with nested services
function operationProxy<Result = unknown>(
	handler: ApiHandler,
	service: string,
	operation = "",
): Result {
	return new Proxy(
		(...properties: unknown[]) => handler(service, operation, properties),
		{
			get: (_, property) =>
				operationProxy(handler, service, `${operation}/${String(property)}`),
		},
	) as unknown as Result;
}
