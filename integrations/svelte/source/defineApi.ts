import {
	defineApi as defaultDefineApi,
	DefineApiOptions,
} from "@digitak/gravity/api/defineApi";
import { apiProxy } from "@digitak/gravity/api/apiProxy";
import { getCacheKey } from "@digitak/gravity/api/getCacheKey";
import { isBrowser } from "@digitak/gravity/utilities/isBrowser";
import { swrResponse, SwrResponse } from "./SwrResponse";
import { cache } from "./cache";
import type { BaseService } from "@digitak/gravity/services/BaseService";
import type { BaseServiceConstructor } from "@digitak/gravity/services/BaseServiceConstructor";
import { Instance } from "@digitak/gravity/types/Instance";

type UseApiService<Service extends BaseService> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (
				...args: Parameters<Service[Key]>
		  ) => SwrResponse<Awaited<ReturnType<Service[Key]>>>
		: never;
};

type UseApi<Services extends Record<string, BaseServiceConstructor>> = {
	[Key in keyof Services]: UseApiService<Instance<Services[Key]>>;
};

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>(options: DefineApiOptions = {}) {
	const api = defaultDefineApi<Services>(options);

	const useApi = () =>
		apiProxy((service, operation, properties) => {
			if (!isBrowser()) return swrResponse<unknown>(async () => void 0);

			const fetcher: () => Promise<unknown> = async () => {
				// @ts-ignore
				return await api[service][operation](properties);
			};
			const key = getCacheKey(service, operation, properties);
			let response: SwrResponse<unknown>;

			if (key) {
				const cached = cache.get(key);
				if (cached) response = cached;
				else {
					response = swrResponse<unknown>(fetcher);
					cache.set(key, response);
				}
			} else response = swrResponse<unknown>(fetcher);

			response.refresh();
			return response;
		}) as UseApi<Services>;

	return { api, useApi };
}
