import { createStoreData } from "@digitak/gravity/store/createStoreData";
import { DefineStoreInterface } from "@digitak/gravity/store/defineApiWithStore";
import { Identify } from "@digitak/gravity/store/Identify";
import { StoreData } from "@digitak/gravity/store/StoreData";
import { updateStoreData } from "@digitak/gravity/store/updateStoreData";
import { readable, Unsubscriber } from "svelte/store";
import type { Store } from "./Store.js";
import { setIdentifiable } from "./identifiables.js";

const initStore = (set: (newValue: unknown) => void) => {
	set({
		...createStoreData(),
		refresh: async () => {
			set({ isRefreshing: true });
			for await (const { data, error } of fetcher()) {
				set({
					data,
					error,
					isLoading: false,
					lastRefreshAt: Date.now(),
				});
			}
			set({ isRefreshing: false });
		},
	});
};

export const create = (init, $store) => {
	const store = readable($store, (set) => {
		initStore((input) => set(Object.assign($store, input)));
	});
	return store;
};

export const createStore: DefineStoreInterface<
	Store<unknown>
>["createStore"] = (fetcher, identify?: Identify) => {
	const storeData = {
		...createStoreData(),
		refresh: () => {},
	};
	if (identify) {
	}
	const store = readable<StoreData<unknown>>(storeData, (set) => {
		let unsubscribers: Array<Unsubscriber> = [];
		let clone: unknown;
		const unsubscribe = () =>
			unsubscribers.forEach((unsubscribe) => unsubscribe());

		storeData.refresh = async () => {
			set(Object.assign(storeData, { isRefreshing: true }));
			for await (const response of fetcher()) {
				updateStoreData(storeData, response);
				if (identify) {
					unsubscribe();
					[clone, unsubscribers] = subscribeIdentifiables(
						storeData.data,
						identify,
						() => set(storeData),
					);
					storeData.data = clone;
				}
				set(storeData);
			}
			set(Object.assign(storeData, { isRefreshing: false }));
		};

		set(storeData);
		return unsubscribe;
	});

	return store;
};

function subscribeIdentifiables<Item>(
	item: Item,
	identify: Identify,
	update: () => void,
): [Item, Array<Unsubscriber>] {
	const unsubscribers = new Array<Unsubscriber>();

	if (Array.isArray(item)) {
		const clone = <Item & any[]>[];
		item.forEach((child) => {
			const [childClone, childUnsubscribers] = subscribeIdentifiables(
				child,
				identify,
				update,
			);
			clone.push(childClone);
			unsubscribers.concat(childUnsubscribers);
		});
		return [clone as Item, unsubscribers];
	} else if (item instanceof Map) {
		const clone = <Item & Map<any, any>>new Map<any, any>();
		item.forEach((value, key) => {
			const [childClone, childUnsubscribers] = subscribeIdentifiables(
				value,
				identify,
				update,
			);
			clone.set(key, childClone);
			unsubscribers.concat(childUnsubscribers);
		});
		return [clone as Item, unsubscribers];
	} else if (item instanceof Set) {
		const clone = <Item & Set<any>>new Set<any>();
		item.forEach((child) => {
			const [childClone, childUnsubscribers] = subscribeIdentifiables(
				child,
				identify,
				update,
			);
			clone.add(childClone);
			unsubscribers.concat(childUnsubscribers);
		});
		return [clone as Item, unsubscribers];
	} else if (
		typeof item != "object" ||
		item == null ||
		item instanceof Date ||
		item instanceof ArrayBuffer ||
		item instanceof Uint8Array ||
		item instanceof Uint8ClampedArray ||
		item instanceof Uint16Array ||
		item instanceof Uint32Array ||
		item instanceof Int8Array ||
		item instanceof Int16Array ||
		item instanceof Int32Array ||
		item instanceof Float32Array ||
		item instanceof Float64Array ||
		item instanceof DataView ||
		item instanceof Boolean ||
		item instanceof Number ||
		item instanceof String ||
		item instanceof Date ||
		item instanceof RegExp
	) {
		return [item, unsubscribers];
	} else {
		const key = identify(item as any);
		if (!key) return [item, unsubscribers];

		const clone: Item = { ...item };
		const store = setIdentifiable(key, item);

		const unsubscriber = store.subscribe((value: any) => {
			for (const key in clone) {
				if (key in value) {
					clone[key] = value[key];
				} else {
					delete clone[key];
				}
			}
			for (const key in value) {
				if (!(key in clone)) {
					(clone as any)[key] = value[key];
				}
			}
			update();
		});

		unsubscribers.push(unsubscriber);
		return [clone, unsubscribers];
	}
}
