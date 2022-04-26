import type { ApiResponse } from "@digitak/gravity";
import { createStoreData } from "@digitak/gravity/store/createStoreData";
import type { Store } from "./Store.js";
import { useState } from "react";

export const createStore = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): Store<Data> => {
	const storeData = createStoreData<Data>();

	const [store, setStore] = useState({
		...storeData,
		refresh: async () => {
			setStore({ ...store, isRefreshing: true });
			const response = await fetcher();
			setStore({
				...store,
				...response,
				isLoading: false,
				isRefreshing: false,
				lastRefreshAt: Date.now(),
			} as Store<Data>);
		},
	} as Store<Data>);

	return store;
};
