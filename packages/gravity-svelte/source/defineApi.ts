import type { DefineStoreOptions } from "@digitak/gravity/store/defineApiWithStore";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineApiWithStore";
import type { StoreProxy } from "./StoreProxy.js";
import type { ServicesRecord } from "@digitak/gravity";
import { defineApiWithStore } from "@digitak/gravity/store/defineApiWithStore";
import { createStore } from "./createStore.js";
import { get as getStoreData, Writable, writable } from "svelte/store";
import { storeCache } from "./storeCache.js";
import { identifiables } from "./identifiables.js";

export function defineApi<Services extends ServicesRecord<any>>(
	options: DefineStoreOptions = {},
) {
	return defineApiWithStore<Store<unknown>, Writable<unknown>>(options, {
		frameworkName: "Svelte",
		storeCache,
		createStore,
		getStoreData,
		refreshStoreOnRequest: true,
		allowNoCache: true,
		setIdentifiable: (key, value) => {
			let store = identifiables.get(key);
			if (store) {
				store.set(value);
			} else {
				store = writable(value);
				identifiables.set(key, store);
			}
			return store;
		},
		subscribeStore: (store, onChange) => {
			store.subscribe(onChange);
			return () => {};
		},
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
