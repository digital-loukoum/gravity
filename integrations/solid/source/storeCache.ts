import { Store } from "./Store";

export const storeCache = new Map<
	string,
	Map<Uint8Array | null, Store<unknown>>
>();
