import { Writable } from "svelte/store";
import type { ApiStoreData } from "@digitak/gravity/apiStore/ApiStoreData.js";
import type { BaseApiStore } from "@digitak/gravity/apiStore/BaseApiStore.js";

export type ApiStore<Data> = Writable<ApiStoreData<Data>> & BaseApiStore;
