import { defineStore } from "@digitak/gravity/store/defineStore";
import type { DefineStoreOptions } from "@digitak/gravity/store/defineStore";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineStore";
import { StoreProxy } from "./StoreProxy.js";
import { createStore } from "./createStore.js";
import { storeCache } from "./storeCache.js";
import type { ServicesRecord } from "@digitak/gravity";

export function defineApi<Services extends ServicesRecord<any>>(
	options: DefineStoreOptions = {},
) {
	return defineStore<Store<unknown>>(options, {
		frameworkName: "Solid",
		storeCache,
		createStore,
		getStoreData: (store) => store,
		refreshOnStoreRequest: false,
		allowNoCache: false, // no cache would cause infinite refreshes
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
