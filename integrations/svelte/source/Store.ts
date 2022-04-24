import { Writable } from "svelte/store";
import type { StoreData } from "@digitak/gravity/store/StoreData.js";
import type { BaseStore } from "@digitak/gravity/store/BaseStore.js";

export type Store<Data> = Writable<StoreData<Data>> & BaseStore;
