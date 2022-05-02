import type { StoreData } from "@digitak/gravity/store/StoreData";
import type { UnwrapNestedRefs } from "vue";

export type Store<Data> = UnwrapNestedRefs<StoreData<Data>>;
