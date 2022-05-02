import type { StoreData } from "./StoreData.js";

export const createStoreData = <Data>() =>
	({
		data: <Data | undefined>undefined,
		error: <Error | undefined>undefined,
		isLoading: true,
		isRefreshing: true,
		lastRefreshAt: <number | undefined>undefined,
	} as StoreData<Data>);
