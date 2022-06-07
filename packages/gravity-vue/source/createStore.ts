import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { reactive } from "vue";
import type { Store } from "./Store.js";
import type { DefineStoreInterface } from "@digitak/gravity/store/defineStore";

export const createStore: DefineStoreInterface<
	Store<unknown>
>["createStore"] = (fetcher) => {
	const store = reactive<StoreData<unknown>>({
		...createStoreData(),
		refresh: async () => {
			store.isRefreshing = true;
			for await (const data of fetcher()) {
				updateStoreData(store, data);
			}
			store.isRefreshing = false;
		},
	});
	return store;
};
