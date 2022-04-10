import type { ApiHandler } from "./ApiHandler.js";
import { proxy } from "../utilities/proxy.js";

export function apiProxy<Result = unknown>(handler: ApiHandler): Result {
	return proxy<Result>((service) =>
		proxy((operation) => apiTargetProxy(handler, service, operation)),
	);
}

// recursive proxy that can deal with nested services
function apiTargetProxy<Result = unknown>(
	handler: ApiHandler,
	service: string,
	target = "",
): Result {
	return new Proxy(
		(...properties: unknown[]) => handler(service, target, properties),
		{
			get: (_, property) =>
				apiTargetProxy(handler, service, `${target}/${String(property)}`),
		},
	) as unknown as Result;
}
