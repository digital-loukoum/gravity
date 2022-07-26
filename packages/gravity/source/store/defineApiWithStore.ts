import { apiProxy } from "../api/apiProxy.js";
import type { DefineApiOptions, DefineApiResult } from "../api/defineApi.js";
import { getCacheKey } from "../api/getCacheKey.js";
import { isBrowser } from "../utilities/isBrowser.js";
import type { StoreData } from "./StoreData.js";
import type { FetchOptions } from "./FetchOptions.js";
import type { ApiResponse } from "../index.js";
import { defineApi } from "../api.js";
import { bunker } from "@digitak/bunker";
import type { ServicesRecord } from "../services/ServicesRecord.js";
import { gravityDB } from "../api/gravityDB.js";
import { createStoreData } from "./createStoreData.js";
import {
	createStoreInitializer,
	type StoreInitializer,
} from "./createStoreInitializer.js";
import { createIdentifiableUpdater } from "../identifiables/updateIdentifiables.js";

export type DefineStoreInterface<Store> = {
	createStore: (
		$store: StoreData<unknown>,
		initializeStore?: StoreInitializer,
	) => Store;
	storeCache: Map<string, Store>;
	getStoreData: (store: Store) => StoreData<unknown>;
	unwrapStore?: (store: Store) => any;
	refreshOnStoreRequest?: boolean;
	allowNoCache: boolean;
	frameworkName: string;
	setIdentifiable?: (key: string, value: unknown) => void;
};

export type DefineStoreOptions = DefineApiOptions & FetchOptions;

export type DefineStoreResult<
	Services extends ServicesRecord<any>,
	StoreProxy,
> = DefineApiResult<Services> & {
	store: StoreProxy;
	useStore: (options?: FetchOptions) => StoreProxy;
};

export function defineApiWithStore<Store>(
	options: DefineStoreOptions,
	{
		storeCache,
		refreshOnStoreRequest,
		frameworkName,
		allowNoCache,
		createStore,
		getStoreData,
		unwrapStore = (store) => store,
		setIdentifiable,
	}: DefineStoreInterface<Store>,
) {
	const api = defineApi(options);
	const { resolveApiCall } = api;

	const useStore = ({
		cache = options.cache ?? true,
		network = options.network ?? true,
		interval = options.interval,
		persist = options.persist,
		fetcher = options.fetcher,
		identify = options.identify,
	}: FetchOptions = {}) => {
		const updateIdentifiables = createIdentifiableUpdater({
			identify,
			setIdentifiable,
		});

		apiProxy((service, target, properties) => {
			if (cache !== true && !allowNoCache) {
				cache = true;
				console.warn(
					`[Gravity] Enabling store cache with ${frameworkName} is mandatory as setting it to another value than 'true' might cause infinite render loops.\n[Gravity] Store cache has been switched on.`,
				);
			}

			if (!isBrowser()) {
				const store = createStore(createStoreData());
				return unwrapStore(store);
			}

			const body: null | Uint8Array = properties?.length
				? bunker(properties)
				: null;
			const key = getCacheKey(service, target, body);
			const cached = (cache === true || cache == "read") && storeCache.get(key);
			let store: Store;

			const fetch = async (onResponse: (response: ApiResponse) => void) => {
				let apiResponseFulfilled = false;

				const persistedResponse =
					persist &&
					gravityDB.get(key).then((data) => {
						// api response has priority over persisted response
						// (in the almost impossible eventuality where api fetch is faster than local fetch)
						if (apiResponseFulfilled) return;
						onResponse({ data });
					});

				const apiResponse = resolveApiCall(
					{ fetcher },
					{
						service,
						target,
						properties,
						body,
						updateIdentifiables,
					},
				).then((response) => {
					apiResponseFulfilled = true;
					if (!response.error && persist) {
						gravityDB.set(key, response.data);
					}
					onResponse(response);
				});

				await Promise.all([persistedResponse, apiResponse]);
			};

			const initializeStore = createStoreInitializer(fetch);

			if (cached) store = cached;
			else {
				store = createStore(createStoreData(), initializeStore);
				if (cache === true || cache == "write") {
					storeCache.set(key, store);
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
	};

	const store = useStore();
	return { ...api, store, useStore };
}
