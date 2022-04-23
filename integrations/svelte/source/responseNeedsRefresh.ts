import { get } from "svelte/store";
import { ApiStore } from "./ApiStore";

export const responseNeedsRefresh = (
	store: ApiStore<unknown>,
	interval?: number,
) => {
	if (!interval) return false;
	const { lastRefreshAt } = get(store);
	return !lastRefreshAt || lastRefreshAt + interval < Date.now();
};
