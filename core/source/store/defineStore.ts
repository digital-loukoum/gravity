import { apiProxy } from "../api/apiProxy.js";
import type { DefineApiOptions, DefineApiResult } from "../api/defineApi.js";
import { getCacheKey } from "../api/getCacheKey.js";
import { isBrowser } from "../utilities/isBrowser.js";
import type { StoreData } from "./StoreData.js";
import type { FetchOptions } from "./FetchOptions.js";
import type { ApiResponse, BaseServiceConstructor } from "../index.js";
import { defineApi } from "../api.js";
import { bunker } from "@digitak/bunker";
import { compareArrays } from "../utilities/compareArrays.js";

export type DefineStoreInterface<Store> = {
	createStore: (fetcher: () => Promise<ApiResponse<unknown>>) => Store;
	storeCache: Map<string, Map<Uint8Array | null, Store>>;
	getStoreData: (store: Store) => StoreData<unknown>;
	unwrapStore?: boolean;
};

export type DefineStoreOptions = DefineApiOptions & FetchOptions;

export type DefineStoreResult<
	Services extends Record<string, BaseServiceConstructor>,
	StoreProxy,
> = DefineApiResult<Services> & {
	store: StoreProxy;
	useStore: (options?: FetchOptions) => StoreProxy;
};

export function defineStore<Store>(
	options: DefineStoreOptions,
	{
		createStore,
		storeCache,
		getStoreData,
		unwrapStore,
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
				return createStore(() => new Promise(() => {}));
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

			const storeData = (() => {
				let data: undefined | StoreData<unknown> = undefined;
				return () => (data === undefined ? (data = getStoreData(store)) : data);
			})();

			if ((network === true || network == "if-needed") && !cached) {
				const { lastRefreshAt, refresh } = storeData();
				const shouldRefresh =
					!lastRefreshAt || !interval || lastRefreshAt + interval < Date.now();
				if (shouldRefresh) refresh();
			}

			return unwrapStore ? storeData() : store;
		});

	const store = useStore();
	return { ...api, store, useStore };
}
