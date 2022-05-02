import type { StoreData } from "@digitak/gravity/store/StoreData";
import type { StoreApi } from "zustand";

export type Store<Data> = StoreApi<StoreData<Data>>;
