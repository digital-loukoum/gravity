import type { ApiResponse } from "../api/ApiResponse.js";

export type UseApiData<Data> = ApiResponse<Data> & {
	isLoading: boolean;
	isRefreshing: boolean;
	lastRefreshAt?: number;
};
