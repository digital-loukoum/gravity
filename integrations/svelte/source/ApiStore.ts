import { Writable } from "svelte/store";
import type { ApiStoreData } from "@digitak/gravity/apiStore/ApiStoreData";
import type { ApiStoreInterface } from "@digitak/gravity/apiStore/ApiStoreInterface";

export type ApiStore<Data> = Writable<ApiStoreData<Data>> & ApiStoreInterface;
