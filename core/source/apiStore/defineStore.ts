import { apiProxy } from "../api/apiProxy.js";
import type { DefineApiOptions } from "../api/defineApi.js";
import { getCacheKey } from "../api/getCacheKey.js";
import {
	defineApi,
	type ApiResponse,
	type BaseServiceConstructor,
} from "../index.js";
import { isBrowser } from "../utilities/isBrowser.js";
import type { ApiStoreData } from "./ApiStoreData.js";
import type { ApiStoreOptions } from "./ApiStoreOptions.js";

type DefineStoreOptions<ApiStore extends { refresh: () => void }> = {
	createStore: (fetcher: () => Promise<ApiResponse<unknown>>) => ApiStore;
	apiCache: Map<string, ApiStore>;
	getStoreData: (store: ApiStore) => ApiStoreData<unknown>;
};

export function defineApiWithStore<
	ApiStoreProxy,
	ApiStore extends { refresh: () => void },
>({ createStore, apiCache, getStoreData }: DefineStoreOptions<ApiStore>) {
	return <Services extends Record<string, BaseServiceConstructor>>(
		options: DefineApiOptions & ApiStoreOptions,
	) => {
		const coreApi = defineApi(options);
		const { resolveApiCall } = coreApi;

		const apiStore = ({
			cache = options.cache ?? true,
			network = options.network ?? true,
			interval = options.interval,
		}: ApiStoreOptions = {}) =>
			apiProxy((service, operation, properties) => {
				if (!isBrowser()) {
					return createStore(new Promise(() => {}) as any);
				}

				const fetcher: () => Promise<ApiResponse<unknown>> = async () => {
					return await resolveApiCall(fetch, service, operation, properties);
				};
				const key = getCacheKey(service, operation, properties);

				// by framework
				let store: ApiStore;
				let cached: false | undefined | ApiStore = false;
				///

				if (key) {
					cached = (cache === true || cache == "read") && apiCache.get(key);
					if (cached) store = cached;
					else {
						store = createStore(fetcher);
						if (cache === true || cache == "write") apiCache.set(key, store);
					}
				} else store = createStore(fetcher);

				if (
					interval &&
					(network === true || (!cached && network == "if-needed"))
				) {
					const { lastRefreshAt } = getStoreData(store);
					if (!lastRefreshAt || lastRefreshAt + interval < Date.now()) {
						store.refresh();
					}
				}

				return store;
			}) as ApiStoreProxy;

		return { ...coreApi, apiStore };
	};
}
