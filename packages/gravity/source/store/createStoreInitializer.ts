import type { ApiResponse } from "../index.js";

export type StoreInitializer = (setStore: (input: unknown) => void) => void;

/**
 * Create a store initializer, whose role is to assign the "refresh" function that actually loads the data.
 */
export function createStoreInitializer(
	fetch: () => AsyncGenerator<ApiResponse<unknown>>,
): StoreInitializer {
	return (setStore) => {
		setStore({
			refresh: async () => {
				setStore({ isRefreshing: true });
				for await (const { data, error } of fetch()) {
					setStore({
						data,
						error,
						isLoading: false,
						lastRefreshAt: Date.now(),
					});
				}
				setStore({ isRefreshing: false });
			},
		});
	};
}
