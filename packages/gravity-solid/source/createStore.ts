import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { createStore as createSolidStore } from "solid-js/store";
import type { Store } from "./Store.js";
import type { DefineStoreInterface } from "@digitak/gravity/store/defineStore";

export const createStore: DefineStoreInterface<
	Store<unknown>
>["createStore"] = (fetcher) => {
	const store = createSolidStore<StoreData<unknown>>({
		...createStoreData(),
		refresh: async () => {
			setStoreData({ isRefreshing: true });
			for await (const data of fetcher()) {
				setStoreData(updateStoreData({ ...getStoreData() }, data));
			}
			setStoreData({ isRefreshing: false });
		},
	});
	const getStoreData = () => store[0];
	const setStoreData = (data: Partial<StoreData<unknown>>) => store[1](data);
	return getStoreData();
};
