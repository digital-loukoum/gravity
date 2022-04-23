import { ApiResponse } from "@digitak/gravity";
import { writable } from "svelte/store";
import type { ApiStore } from "./ApiStore.js";

export const swrResponse = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): ApiStore<Data> => {
	const store: ApiStore<Data> = writable({
		data: <Data | undefined>undefined,
		error: <Error | undefined>undefined,
		isLoading: true,
		isRefreshing: true,
		lastRefreshAt: <number | undefined>undefined,
	}) as any;

	store.refresh = async () => {
		store.update(($store) => {
			$store.isRefreshing = true;
			return $store;
		});

		const { data, error } = await fetcher();

		store.update(($store) => {
			$store.data = data;
			$store.error = error;
			$store.isLoading = false;
			$store.isRefreshing = false;
			$store.lastRefreshAt = Date.now();
			return $store;
		});
	};

	return store;
};
