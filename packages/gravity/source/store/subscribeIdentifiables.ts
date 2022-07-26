import type { Identify } from "./Identify.js";
import type { Unsubscriber } from "../types/Unsubscriber.js";

export function subscribeIdentifiables<Item>(
	item: Item,
	options: {
		identify: Identify;
		update: () => void;
		setIdentifiable: (key: string, value: Item) => void;
		subscribe;
	},
): [Item, Array<Unsubscriber>] {
	let { identify, update } = options;
	const unsubscribers = new Array<Unsubscriber>();

	if (Array.isArray(item)) {
		const clone = <Item & any[]>[];
		item.forEach((child) => {
			const [childClone, childUnsubscribers] = subscribeIdentifiables(
				child,
				options,
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
				options,
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
				options,
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

		const unsubscriber = store.subscribe((newValue: any) => {
			for (const key in clone) {
				if (key in newValue) {
					clone[key] = newValue[key];
				} else {
					delete clone[key];
				}
			}
			for (const key in newValue) {
				if (!(key in clone)) {
					(clone as any)[key] = newValue[key];
				}
			}
			update();
		});

		unsubscribers.push(unsubscriber);
		return [clone, unsubscribers];
	}
}
