import { useContext } from "react";
import { createStore } from "./createStore.js";
import { Store } from "./Store.js";
import { StoreContext } from "./StoreContext.js";

export const useStore = (key: string): Store<unknown> => {
	console.log("useStore is called");
	const storeMap = useContext(StoreContext);
	const fetcher = async () => ({ data: Math.floor(Math.random() * 100) });
	let store = storeMap.get(key);
	if (!store) storeMap.set(key, (store = createStore(fetcher)));
	return store;
};
