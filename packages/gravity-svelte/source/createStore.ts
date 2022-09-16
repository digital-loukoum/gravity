import { readable } from "svelte/store";
import type { Store } from "./Store.js";
import type { CreateStore } from "@digitak/gravity/store/createStore";

export const createStore: CreateStore<Store<unknown>> = (
	$store,
	initializeStore,
) => {
	console.log("totototo, is this called several times?");
	return readable($store, (set) => {
		console.log("yolo, and here?");
		initializeStore?.((input) => set(Object.assign($store, input)));
	});
};
