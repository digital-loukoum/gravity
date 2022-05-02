import type { StoreData } from "./StoreData.js";

export function refreshStoreData<Data>(store: StoreData<Data>) {
	store.isRefreshing = true;
	return store;
}
