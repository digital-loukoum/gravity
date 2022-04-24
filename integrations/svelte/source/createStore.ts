import type { ApiResponse } from "@digitak/gravity";
import { createStoreData } from "@digitak/gravity/store/createStoreData.js";
import { refreshStoreData } from "@digitak/gravity/store/refreshStoreData.js";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData.js";
import { writable } from "svelte/store";
import type { Store } from "./Store.js";

export const createStore = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): Store<Data> => {
	const store = writable(createStoreData()) as unknown as Store<Data>;

	store.refresh = async () => {
		store.update(refreshStoreData);
		const data = await fetcher();
		store.update((storeData) => updateStoreData(storeData, data));
	};

	return store;
};
