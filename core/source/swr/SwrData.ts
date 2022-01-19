export type SwrData<Data> = {
	data: Data | undefined;
	error: Error | undefined;
	isLoading: boolean;
	isRefreshing: boolean;
};
