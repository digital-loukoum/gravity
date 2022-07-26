import type { DefineStoreOptions } from "@digitak/gravity/store/defineApiWithStore";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineApiWithStore";
import type { StoreProxy } from "./StoreProxy.js";
import type { ServicesRecord } from "@digitak/gravity";
import { defineApiWithStore } from "@digitak/gravity/store/defineApiWithStore";
import { createStore } from "./createStore.js";
import { get as getStoreData, writable } from "svelte/store";
import { storeCache } from "./storeCache.js";
import { identifiables } from "./identifiables.js";

export function defineApi<Services extends ServicesRecord<any>>(
	options: DefineStoreOptions = {},
) {
	return defineApiWithStore<Store<unknown>>(options, {
		frameworkName: "Svelte",
		storeCache,
		createStore,
		getStoreData,
		refreshOnStoreRequest: true,
		allowNoCache: true,
		setIdentifiable: (key, value) => {
			const store = identifiables.get(key);
			if (store) {
				store.set(value);
			} else {
				identifiables.set(key, writable(store));
			}
		},
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
