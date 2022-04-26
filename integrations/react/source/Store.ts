import type { StoreData } from "@digitak/gravity/store/StoreData";
import type { Atom } from "jotai";

export type Store<Data> = Atom<StoreData<Data>>;
