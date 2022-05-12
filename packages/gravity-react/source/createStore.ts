import type { ApiResponse } from "@digitak/gravity";
import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { refreshStoreData } from "@digitak/gravity/store/refreshStoreData";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { createStore as createZustandStore } from "zustand";
import type { Store } from "./Store.js";

export const createStore = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): Store<Data> => {
	const store = createZustandStore<StoreData<Data>>((set) => ({
		...createStoreData<Data>(),
		refresh: async () => {
			set(() => refreshStoreData(<StoreData<Data>>{}));
			const data = await fetcher();
			set(() => updateStoreData(<StoreData<Data>>{}, data));
		},
	}));
	store.subscribe((value) => console.log("Store changed", value));
	return store;
};
