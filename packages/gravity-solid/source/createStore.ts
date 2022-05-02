import type { ApiResponse } from "@digitak/gravity";
import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { createStore as createSolidStore } from "solid-js/store";
import type { Store } from "./Store.js";

export const createStore = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): Store<Data> => {
	const store = createSolidStore<StoreData<Data>>({
		...createStoreData<Data>(),
		refresh: async () => {
			setStoreData({ isRefreshing: true } as StoreData<Data>);
			const data = await fetcher();
			setStoreData(
				updateStoreData({ ...getStoreData() } as StoreData<Data>, data),
			);
		},
	});
	const getStoreData = () => store[0];
	const setStoreData = (data: StoreData<Data>) => store[1](data);
	return getStoreData();
};
