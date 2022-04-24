import type { ApiResponse } from "../index.js";
import type { StoreData } from "./StoreData.js";

export function updateStoreData<Data>(
	store: StoreData<Data>,
	{ data, error }: ApiResponse<Data>,
) {
	store.data = data;
	store.error = error;
	store.isLoading = false;
	store.isRefreshing = false;
	store.lastRefreshAt = Date.now();
	return store;
}
