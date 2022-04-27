import type { BaseServiceConstructor } from "@digitak/gravity/services/BaseServiceConstructor";
import { defineStore } from "@digitak/gravity/store/defineStore";
import type { DefineStoreOptions } from "@digitak/gravity/store/defineStore";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineStore";
import { StoreProxy } from "./StoreProxy.js";
import { createStore } from "./createStore.js";
import { get as getStoreData } from "svelte/store";
import { storeCache } from "./storeCache.js";

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>(options: DefineStoreOptions = {}) {
	return defineStore<Store<unknown>>(options, {
		storeCache,
		createStore,
		getStoreData,
		refreshOnStoreRequest: true,
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
