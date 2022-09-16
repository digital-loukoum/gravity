import { defineApiWithStore } from "@digitak/gravity/store/defineApiWithStore";
import type { DefineStoreOptions } from "@digitak/gravity/store/defineApiWithStore";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineApiWithStore";
import { StoreProxy } from "./StoreProxy.js";
import { createStore } from "./createStore.js";
import { storeCache } from "./storeCache.js";
import type { ServicesRecord } from "@digitak/gravity";

export function defineApi<Services extends ServicesRecord<any>>(
	options: DefineStoreOptions = {},
) {
	return defineApiWithStore<Store<unknown>>(options, {
		frameworkName: "Vue",
		storeCache,
		createStore,
		getStoreData: (store) => store,
		refreshStoreOnRequest: false,
		allowNoCache: false, // no cache would cause infinite refreshes
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
