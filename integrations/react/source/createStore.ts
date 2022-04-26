import type { ApiResponse } from "@digitak/gravity";
import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { refreshStoreData } from "@digitak/gravity/store/refreshStoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { atom, useAtom } from "jotai";
import type { Store } from "./Store.js";

export const createStore = <Data>(
	fetcher: () => Promise<ApiResponse<Data>>,
): Store<Data> => {
	const store = atom({
		...createStoreData<Data>(),
		refresh: async () => {
			setStoreData(() => ({
				...storeData,
				...(refreshStoreData(storeData) as any),
			}));
			const data = await fetcher();
			setStoreData(() => ({
				...storeData,
				...(updateStoreData(storeData, data) as any),
			}));
		},
	});
	const [storeData, setStoreData] = useAtom(store);
	return store;
};
