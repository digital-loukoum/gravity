import type { IdentifiableSubscriber } from "../identifiables/createIdentifiableSubscriber.js";
import type { ApiResponse } from "../index.js";
import type { Unsubscriber } from "../types/Unsubscriber.js";

export type StoreInitializer = (setStore: (input: unknown) => void) => void;

/**
 * Create a store initializer, whose role is to assign the "refresh" function that actually loads the data.
 */
export function createStoreInitializer(
	fetch: (onResponse: (response: ApiResponse) => void) => Promise<void>,
	subscribeIdentifiables: IdentifiableSubscriber | undefined,
): StoreInitializer {
	return (setStore) => {
		console.warn(new Error("set store!"));
		let unsubscribers: Array<Unsubscriber> = [];
		const unsubscribe = () =>
			unsubscribers.forEach((unsubscriber) => unsubscriber());

		setStore({
			refresh: async () => {
				setStore({ isRefreshing: true });

				await fetch(({ data, error }) => {
					// unsubscribe from all old identifiables
					unsubscribe();

					// subscribe to all new identifiables
					if (!error && subscribeIdentifiables) {
						console.log("subscribe identifiables");
						[data, unsubscribers] = subscribeIdentifiables(data, () => {
							// on change, refresh the store
							setStore(null); // passing null means "don't change any value"
						});
					}

					// update store with the new data
					setStore({
						data,
						error,
						isLoading: false,
						lastRefreshAt: Date.now(),
					});
				});
				setStore({ isRefreshing: false });
			},
		});

		return unsubscribe;
	};
}
