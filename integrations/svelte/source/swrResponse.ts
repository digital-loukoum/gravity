import { writable, Writable, Readable } from "svelte/store";
import type { UseApiData } from "@digitak/gravity/swr/UseApiData";
import type { UseApiInterface } from "@digitak/gravity/swr/UseApiInterface";

export type SwrResponse<Data> = Writable<UseApiData<Data>> & UseApiInterface;

export const swrResponse = <Data>(
	fetcher: () => Promise<Data>,
): SwrResponse<Data> => {
	const store: SwrResponse<Data> = writable(
		{
			data: <Data | undefined>undefined,
			error: <Error | undefined>undefined,
			isLoading: true,
			isRefreshing: true,
		},
		() => () => {
			// on unsubscribe, clear polling interval
			if (store.poller) {
				clearInterval(store.poller);
				store.poller = undefined;
			}
		},
	) as any;

	store.lastRefreshAt = undefined;
	store.poller = undefined;

	store.refresh = async () => {
		store.update(($store) => {
			$store.isRefreshing = true;
			return $store;
		});

		store.lastRefreshAt = Date.now();
		const data = await fetcher();

		store.update(($store) => {
			$store.data = data; // TODO: error should be in 'then'
			$store.isLoading = false;
			$store.isRefreshing = false;
			return $store;
		});
	};

	return store;
};
