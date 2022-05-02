import { Writable } from "svelte/store";
import type { StoreData } from "@digitak/gravity/store/StoreData";

export type Store<Data> = Writable<StoreData<Data>>;
