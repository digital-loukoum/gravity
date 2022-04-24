import { apiProxy } from "../api/apiProxy.js";
import type { DefineApiOptions, DefineApiResult } from "../api/defineApi.js";
import { getCacheKey } from "../api/getCacheKey.js";
import { isBrowser } from "../utilities/isBrowser.js";
import type { StoreData } from "./StoreData.js";
import type { FetchOptions } from "./FetchOptions.js";
import type { BaseStore } from "./BaseStore.js";
import type { ApiResponse, BaseServiceConstructor } from "../index.js";
import { defineApi } from "../api.js";

export type DefineStoreInterface<Store extends BaseStore> = {
	createStore: (fetcher: () => Promise<ApiResponse<unknown>>) => Store;
	storeCache: Map<string, Store>;
	getStoreData: (store: Store) => StoreData<unknown>;
};

export type DefineStoreOptions = DefineApiOptions & FetchOptions;

export type DefineStoreResult<
	Services extends Record<string, BaseServiceConstructor>,
	StoreProxy,
> = DefineApiResult<Services> & {
	store: StoreProxy;
	useStore: (options?: FetchOptions) => StoreProxy;
};

export function defineStore<Store extends BaseStore>(
	options: DefineStoreOptions,
	{ createStore, storeCache, getStoreData }: DefineStoreInterface<Store>,
) {
	const api = defineApi(options);
	const { resolveApiCall } = api;

	const useStore = ({
		cache = options.cache ?? true,
		network = options.network ?? true,
		interval = options.interval,
	}: FetchOptions = {}) =>
		apiProxy((service, operation, properties) => {
			if (!isBrowser()) {
				return createStore(() => new Promise(() => {}));
			}

			const fetcher = () =>
				resolveApiCall(fetch, service, operation, properties);

			const key = getCacheKey(service, operation, properties);

			let store: Store;
			let cached: false | undefined | Store = false;

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

	const store = useStore();
	return { ...api, store, useStore };
}
