import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { createStore as createZustandStore } from "zustand";
import type { Store } from "./Store.js";
import type { DefineStoreInterface } from "@digitak/gravity/store/defineStore";

export const createStore: DefineStoreInterface<
	Store<unknown>
>["createStore"] = (fetcher) => {
	const store = createZustandStore<StoreData<unknown>>((set) => ({
		...createStoreData(),
		refresh: async () => {
			set(() => ({ isRefreshing: true }));
			for await (const data of fetcher()) {
				set(() => updateStoreData(<StoreData<unknown>>{}, data));
			}
			set(() => ({ isRefreshing: false }));
		},
	}));
	return store;
};
