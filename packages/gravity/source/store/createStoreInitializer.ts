import type { ApiResponse } from "../index.js";

export type StoreInitializer = (setStore: (input: unknown) => void) => void;

/**
 * Create a store initializer, whose role is to assign the "refresh" function that actually loads the data.
 */
export function createStoreInitializer(
	fetch: (onResponse: (response: ApiResponse) => void) => Promise<void>,
): StoreInitializer {
	return (setStore) => {
		setStore({
			refresh: async () => {
				setStore({ isRefreshing: true });
				await fetch(({ data, error }) =>
					setStore({
						data,
						error,
						isLoading: false,
						lastRefreshAt: Date.now(),
					}),
				);
				setStore({ isRefreshing: false });
			},
		});
	};
}
