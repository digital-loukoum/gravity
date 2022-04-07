export type UseApiData<Data> = {
	data?: Data;
	error?: Error;
	isLoading: boolean;
	isRefreshing: boolean;
	lastRefreshAt?: number;
};
