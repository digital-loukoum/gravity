import type { ApiResponse } from "../api/ApiResponse.js";

export type StoreData<Data> = ApiResponse<Data> & {
	isLoading: boolean;
	isRefreshing: boolean;
	lastRefreshAt?: number;
	refresh: () => Promise<void>;
};
