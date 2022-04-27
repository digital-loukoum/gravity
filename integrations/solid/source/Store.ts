import type { StoreData } from "@digitak/gravity/store/StoreData";
import type { Store as SolidStore } from "solid-js/store";

export type Store<Data> = SolidStore<StoreData<Data>>;
