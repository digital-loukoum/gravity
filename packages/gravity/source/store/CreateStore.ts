import type { StoreInitializer } from "./createStoreInitializer.js";
import type { StoreData } from "./StoreData.js";

export type CreateStore<Store> = (
	$store: StoreData<unknown>,
	initializeStore?: StoreInitializer,
) => Store;
