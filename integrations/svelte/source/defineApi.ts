import type { BaseServiceConstructor } from "@digitak/gravity/services/BaseServiceConstructor.js";
import type { ApiStoreOptions } from "@digitak/gravity/apiStore/ApiStoreOptions.js";

import { defineApiStore } from "@digitak/gravity/apiStore/defineApiStore.js";
import type { DefineApiStoreOptions } from "@digitak/gravity/apiStore/defineApiStore.js";
import type { ApiStore } from "./ApiStore.js";

import { DefineApiResult } from "@digitak/gravity/api/defineApi.js";
import { ApiStoreProxy } from "./ApiStoreProxy.js";
import { createStore } from "./createStore.js";
import { get as getStoreData } from "svelte/store";
import { storeCache } from "./storeCache.js";

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>(options: DefineApiStoreOptions = {}) {
	return defineApiStore<ApiStore<unknown>>(options, {
		storeCache,
		createStore,
		getStoreData,
	}) as DefineApiResult<Services> & {
		apiStore: (options: ApiStoreOptions) => ApiStoreProxy<Services>;
	};
}
