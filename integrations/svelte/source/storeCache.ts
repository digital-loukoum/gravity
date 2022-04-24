import { Store } from "./Store.js";

export const storeCache = new Map<
	string,
	Map<Uint8Array | null, Store<unknown>>
>();
