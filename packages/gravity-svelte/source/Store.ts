import { Readable } from "svelte/store";
import type { StoreData } from "@digitak/gravity/store/StoreData";

export type Store<Data> = Readable<StoreData<Data>>;
