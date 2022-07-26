import { defineApiWithStore } from "@digitak/gravity/store/defineApiWithStore";
import type { DefineStoreOptions } from "@digitak/gravity/store/defineApiWithStore";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineApiWithStore";
import { StoreProxy } from "./StoreProxy.js";
import { createStore } from "./createStore.js";
import { storeCache } from "./storeCache.js";
import { useStore } from "zustand";
import type { ServicesRecord } from "@digitak/gravity";

export function defineApi<Services extends ServicesRecord<any>>(
	options: DefineStoreOptions = {},
) {
	return defineApiWithStore<Store<unknown>>(options, {
		frameworkName: "React",
		storeCache,
		refreshOnStoreRequest: false, // would cause infinite refreshes with React
		allowNoCache: false, // no cache would cause infinite refreshes with React
		createStore,
		getStoreData: (store) => store.getState(),
		unwrapStore: (store) => useStore(store),
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
