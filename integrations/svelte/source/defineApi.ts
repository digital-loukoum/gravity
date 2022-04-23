import type { BaseService } from "@digitak/gravity/services/BaseService";
import type { BaseServiceConstructor } from "@digitak/gravity/services/BaseServiceConstructor";
import type { ApiStoreOptions } from "@digitak/gravity/apiStore/ApiStoreOptions";

import {
	defineApi as defaultDefineApi,
	DefineApiResult,
	DefineApiOptions,
} from "@digitak/gravity/api/defineApi";
import { apiProxy } from "@digitak/gravity/api/apiProxy";
import { getCacheKey } from "@digitak/gravity/api/getCacheKey";
import { isBrowser } from "@digitak/gravity/utilities/isBrowser";
import { Instance } from "@digitak/gravity/types/Instance";
import type { ApiStore } from "./ApiStore";
import { apiCache } from "./apiCache";
import { responseNeedsRefresh } from "./responseNeedsRefresh";

type ApiStoreService<Service extends BaseService> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (
				...args: Parameters<Service[Key]>
		  ) => ApiStore<Awaited<ReturnType<Service[Key]>>>
		: never;
};

type ApiStoreProxy<Services extends Record<string, BaseServiceConstructor>> = {
	[Key in keyof Services]: ApiStoreService<Instance<Services[Key]>>;
};

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>(
	options: DefineApiOptions & ApiStoreOptions = {},
): DefineApiResult<Services> & {
	apiStore: (options: ApiStoreOptions) => ApiStoreProxy<Services>;
} {
	const core = defaultDefineApi<Services>(options);

	const apiStore = ({
		cache = options.cache ?? true,
		network = options.network ?? true,
		interval = options.interval,
	}: ApiStoreOptions = {}) =>
		apiProxy((service, operation, properties) => {
			if (!isBrowser()) return swrResponse<unknown>(async () => void 0);

			const fetcher: () => Promise<unknown> = async () => {
				return await core.resolveApiCall(service, operation, properties);
			};
			const key = getCacheKey(service, operation, properties);

			// by framework
			let response: SwrResponse<unknown>;
			let cached: false | undefined | SwrResponse<unknown> = false;
			///

			if (key) {
				cached = (cache === true || cache == "read") && apiCache.get(key);
				if (cached) response = cached;
				else {
					response = swrResponse<unknown>(fetcher);
					if (cache === true || cache == "write") cache.set(key, response);
				}
			} else response = swrResponse<unknown>(fetcher);

			if (
				(network === true || (!cached && network == "if-needed")) &&
				responseNeedsRefresh(response, interval)
			) {
				response.refresh();
			}

			return response;
		}) as ApiStoreProxy<Services>;

	return { ...core, apiStore };
}
