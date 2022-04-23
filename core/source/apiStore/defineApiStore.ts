import { apiProxy } from "../api/apiProxy.js";
import type { DefineApiOptions } from "../api/defineApi.js";
import { getCacheKey } from "../api/getCacheKey.js";
import { defineApi, type ApiResponse } from "../index.js";
import { isBrowser } from "../utilities/isBrowser.js";
import type { ApiStoreData } from "./ApiStoreData.js";
import type { ApiStoreOptions } from "./ApiStoreOptions.js";
import type { BaseApiStore } from "./BaseApiStore.js";

export type DefineStoreInterface<ApiStore extends BaseApiStore> = {
	createStore: (fetcher: () => Promise<ApiResponse<unknown>>) => ApiStore;
	storeCache: Map<string, ApiStore>;
	getStoreData: (store: ApiStore) => ApiStoreData<unknown>;
};

export type DefineApiStoreOptions = DefineApiOptions & ApiStoreOptions;

export function defineApiStore<ApiStore extends BaseApiStore>(
	options: DefineApiStoreOptions,
	{ createStore, storeCache, getStoreData }: DefineStoreInterface<ApiStore>,
): unknown {
	const coreApi = defineApi(options);
	const { resolveApiCall } = coreApi;

	const apiStore = ({
		cache = options.cache ?? true,
		network = options.network ?? true,
		interval = options.interval,
	}: ApiStoreOptions = {}) =>
		apiProxy((service, operation, properties) => {
			if (!isBrowser()) {
				return createStore(() => new Promise(() => {}));
			}

			const fetcher = () =>
				resolveApiCall(fetch, service, operation, properties);

			const key = getCacheKey(service, operation, properties);

			let store: ApiStore;
			let cached: false | undefined | ApiStore = false;

			if (key) {
				cached = (cache === true || cache == "read") && storeCache.get(key);
				if (cached) store = cached;
				else {
					store = createStore(fetcher);
					if (cache === true || cache == "write") storeCache.set(key, store);
				}
			} else store = createStore(fetcher);

			if (network === true || (network == "if-needed" && !cached)) {
				const { lastRefreshAt } = getStoreData(store);
				const shouldRefresh =
					!lastRefreshAt || !interval || lastRefreshAt + interval < Date.now();
				if (shouldRefresh) store.refresh();
			}

			return store;
		});

	return { ...coreApi, apiStore };
}
