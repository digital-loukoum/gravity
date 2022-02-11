import type { BaseService } from "@digitak/gravity/services/BaseService";
import type { BaseServiceConstructor } from "@digitak/gravity/services/BaseServiceConstructor";
import type { SwrOptions } from "@digitak/gravity/swr/SwrOptions";

import {
	defineApi as defaultDefineApi,
	DefineApiOptions,
} from "@digitak/gravity/api/defineApi";
import { apiProxy } from "@digitak/gravity/api/apiProxy";
import { getCacheKey } from "@digitak/gravity/api/getCacheKey";
import { isBrowser } from "@digitak/gravity/utilities/isBrowser";
import { Instance } from "@digitak/gravity/types/Instance";
import { swrResponse, SwrResponse } from "./swrResponse";
import { swrCache } from "./swrCache";
import { responseNeedsRefresh } from "./responseNeedsRefresh";

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
>(options: DefineApiOptions & SwrOptions = {}) {
	const { api, apiClient, apiServer, callApi } =
		defaultDefineApi<Services>(options);

	const useApi = ({
		cache = options.cache ?? true,
		network = options.network ?? true,
		interval = options.interval,
	}: SwrOptions = {}) =>
		apiProxy((service, operation, properties) => {
			if (!isBrowser()) return swrResponse<unknown>(async () => void 0);

			const fetcher: () => Promise<unknown> = async () => {
				// FIXME: will bug for nested services
				// @ts-ignore
				return await api[service][operation](...properties);
			};
			const key = getCacheKey(service, operation, properties);
			let response: SwrResponse<unknown>;
			let cached: false | undefined | SwrResponse<unknown> = false;

			if (key) {
				cached = (cache === true || cache == "read") && swrCache.get(key);
				if (cached) response = cached;
				else {
					response = swrResponse<unknown>(fetcher);
					if (cache === true || cache == "write") swrCache.set(key, response);
				}
			} else response = swrResponse<unknown>(fetcher);

			if (
				network == "poll" ||
				((network === true || (!cached && network == "if-needed")) &&
					responseNeedsRefresh(response, interval))
			) {
				response.refresh();
				if (network == "poll" && response.poller) {
					clearInterval(response.poller);
					response.poller = undefined;
				}
			}

			if (network == "poll" && !response.poller) {
				response.poller = setInterval(() => {
					response.refresh();
				}, interval);
			}

			return response;
		}) as UseApi<Services>;

	return { api, apiClient, apiServer, callApi, useApi };
}
