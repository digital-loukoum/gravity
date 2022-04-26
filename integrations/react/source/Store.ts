import type { StoreData } from "@digitak/gravity/store/StoreData";
import type { BaseStore } from "@digitak/gravity/store/BaseStore";

export type Store<Data> = StoreData<Data> & BaseStore;
