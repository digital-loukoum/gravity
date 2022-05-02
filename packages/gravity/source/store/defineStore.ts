import { apiProxy } from "../api/apiProxy.js";
import type { DefineApiOptions, DefineApiResult } from "../api/defineApi.js";
import { getCacheKey } from "../api/getCacheKey.js";
import { isBrowser } from "../utilities/isBrowser.js";
import type { StoreData } from "./StoreData.js";
import type { FetchOptions } from "./FetchOptions.js";
import type { ApiResponse } from "../index.js";
import { defineApi } from "../api.js";
import { bunker } from "@digitak/bunker";
import { compareArrays } from "../utilities/compareArrays.js";
import type { ServicesRecord } from "../services/ServicesRecord.js";

export type DefineStoreInterface<Store> = {
	createStore: (fetcher: () => Promise<ApiResponse<unknown>>) => Store;
	storeCache: Map<string, Map<Uint8Array | null, Store>>;
	getStoreData: (store: Store) => StoreData<unknown>;
	unwrapStore?: (store: Store) => any;
	refreshOnStoreRequest?: boolean;
};

export type DefineStoreOptions = DefineApiOptions & FetchOptions;

export type DefineStoreResult<
	Services extends ServicesRecord<any>,
	StoreProxy,
> = DefineApiResult<Services> & {
	store: StoreProxy;
	useStore: (options?: FetchOptions) => StoreProxy;
};

export function defineStore<Store>(
	options: DefineStoreOptions,
	{
		storeCache,
		refreshOnStoreRequest,
		createStore,
		getStoreData,
		unwrapStore = (store) => store,
	}: DefineStoreInterface<Store>,
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
				const store = createStore(() => new Promise(() => {}));
				return unwrapStore(store);
			}
			const body: null | Uint8Array = properties?.length
				? bunker(properties)
				: null;

			const fetcher = () =>
				resolveApiCall(fetch, service, operation, properties, body);

			const key = getCacheKey(service, operation);

			let store: Store;
			let cached: false | undefined | Store = false;
			let cacheMap = storeCache.get(key);

			if (cacheMap && (cache === true || cache == "read")) {
				for (const [serializedParameters, cachedStore] of cacheMap) {
					if (compareArrays(serializedParameters, body)) {
						cached = cachedStore;
						break;
					}
				}
			}

			console.log("storeCache", storeCache);
			if (cached) store = cached;
			else {
				store = createStore(fetcher);
				if (cache === true || cache == "write") {
					if (!cacheMap) {
						storeCache.set(key, (cacheMap = new Map()));
					}
					cacheMap.set(body, store);
				}
			}

			if ((network && !cached) || (refreshOnStoreRequest && network === true)) {
				const { lastRefreshAt, refresh } = getStoreData(store);
				const shouldRefresh =
					!lastRefreshAt || !interval || lastRefreshAt + interval < Date.now();
				if (shouldRefresh) refresh();
			}

			return unwrapStore(store);
		});

	const store = useStore();
	return { ...api, store, useStore };
}
