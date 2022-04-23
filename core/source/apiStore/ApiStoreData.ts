import type { ApiResponse } from "../api/ApiResponse.js";

export type ApiStoreData<Data> = ApiResponse<Data> & {
	isLoading: boolean;
	isRefreshing: boolean;
	lastRefreshAt?: number;
};
