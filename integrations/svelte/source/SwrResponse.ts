import { writable, Writable, Readable } from "svelte/store";

export type ReadonlySwrResponse<Data> = Readable<{
	data: Data | undefined;
	error?: Error;
	isLoading: boolean;
}>;

export const swrResponse = <Data>(
	fetcher: () => Promise<Data>,
): SwrResponse<Data> => {
	const store: SwrResponse<Data> = writable({
		data: <Data | undefined>undefined,
		error: <Error | undefined>undefined,
		isLoading: true,
	}) as any;

	store.refresh = async () => {
		store.update((store) => {
			store.isLoading = true;
			return store;
		});
		const data = await fetcher();
		store.update((store) => {
			store.data = data; // TODO: error should be in 'then'
			store.isLoading = false;
			return store;
		});
	};

	return store;
};

export type SwrResponse<Data> = Writable<{
	data: Data | undefined;
	error: Error | undefined;
	isLoading: boolean;
}> & { refresh: () => void };
