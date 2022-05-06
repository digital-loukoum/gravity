import type { ApiResponse } from "@digitak/gravity";
import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { refreshStoreData } from "@digitak/gravity/store/refreshStoreData";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { reactive } from "vue";
import type { Store } from "./Store.js";

export const createStore = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): Store<Data> => {
	const store = reactive<StoreData<Data>>({
		...createStoreData<Data>(),
		refresh: async () => {
			refreshStoreData(store as StoreData<Data>);
			const data = await fetcher();
			console.log("data", data);
			updateStoreData(store as StoreData<Data>, data);
		},
	});
	return store;
};
