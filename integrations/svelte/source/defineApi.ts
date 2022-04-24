import type { BaseServiceConstructor } from "@digitak/gravity/services/BaseServiceConstructor.js";
import { defineStore } from "@digitak/gravity/store/defineStore.js";
import type { DefineStoreOptions } from "@digitak/gravity/store/defineStore.js";
import type { Store } from "./Store.js";
import type { DefineStoreResult } from "@digitak/gravity/store/defineStore.js";
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
	}) as DefineStoreResult<Services, StoreProxy<Services>>;
}
