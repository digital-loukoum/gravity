import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { DefineStoreInterface } from "@digitak/gravity/store/defineStore";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { writable } from "svelte/store";
import type { Store } from "./Store.js";

export const createStore: DefineStoreInterface<
	Store<unknown>
>["createStore"] = (fetcher) => {
	const store = writable<StoreData<unknown>>({
		...createStoreData(),
		refresh: async () => {
			store.update(($store) => (($store.isRefreshing = true), $store));
			for await (const data of fetcher()) {
				store.update(($store) => updateStoreData($store, data));
			}
			store.update(($store) => (($store.isRefreshing = false), $store));
		},
	});

	return store;
};
