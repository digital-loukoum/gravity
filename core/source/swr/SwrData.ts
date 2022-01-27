export type SwrData<Data> = {
	data?: Data;
	error?: Error;
	isLoading: boolean;
	isRefreshing: boolean;
};
