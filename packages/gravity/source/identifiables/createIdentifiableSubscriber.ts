import type { Unsubscriber } from "../types/Unsubscriber.js";
import type { Subscriber } from "../types/Subscriber.js";
import type { Identify } from "./Identify.js";
import { defaultIdentifier } from "./defaultIdentifier.js";

export type IdentifiableSubscriber<Data = unknown> = (
	data: Data,
	onChange: () => void,
) => [Data, Array<Unsubscriber>];

export function createIdentifiableSubscriber<IdentifierStore>(options: {
	identify: undefined | Identify | boolean;
	setIdentifiable:
		| undefined
		| ((key: string, value: unknown) => IdentifierStore);
	subscribeStore: undefined | Subscriber<IdentifierStore>;
}): IdentifiableSubscriber {
	return function subscribeIdentifiables<Data>(
		data: Data,
		onChange: () => void,
	): [Data, Array<Unsubscriber>] {
		let { identify, setIdentifiable, subscribeStore } = options;
		if (!identify || !setIdentifiable || !subscribeStore) return [data, []];
		if (identify === true) identify = defaultIdentifier;
		const unsubscribers = new Array<Unsubscriber>();

		if (Array.isArray(data)) {
			const clone = <Data & any[]>new Array<any>();
			data.forEach((child) => {
				const [childClone, childUnsubscribers] = subscribeIdentifiables(
					child,
					onChange,
				);
				clone.push(childClone);
				unsubscribers.concat(childUnsubscribers);
			});
			return [clone as Data, unsubscribers];
		} else if (data instanceof Map) {
			const clone = <Data & Map<any, any>>new Map<any, any>();
			data.forEach((value, key) => {
				const [childClone, childUnsubscribers] = subscribeIdentifiables(
					value,
					onChange,
				);
				clone.set(key, childClone);
				unsubscribers.concat(childUnsubscribers);
			});
			return [clone as Data, unsubscribers];
		} else if (data instanceof Set) {
			const clone = <Data & Set<any>>new Set<any>();
			data.forEach((child) => {
				const [childClone, childUnsubscribers] = subscribeIdentifiables(
					child,
					onChange,
				);
				clone.add(childClone);
				unsubscribers.concat(childUnsubscribers);
			});
			return [clone as Data, unsubscribers];
		} else if (
			typeof data != "object" ||
			data == null ||
			data instanceof Date ||
			data instanceof ArrayBuffer ||
			data instanceof Uint8Array ||
			data instanceof Uint8ClampedArray ||
			data instanceof Uint16Array ||
			data instanceof Uint32Array ||
			data instanceof Int8Array ||
			data instanceof Int16Array ||
			data instanceof Int32Array ||
			data instanceof Float32Array ||
			data instanceof Float64Array ||
			data instanceof DataView ||
			data instanceof Boolean ||
			data instanceof Number ||
			data instanceof String ||
			data instanceof Date ||
			data instanceof RegExp
		) {
			return [data, unsubscribers];
		} else {
			const key = identify(data as any);
			console.log("Found object with key", key);
			if (!key) return [data, unsubscribers];

			const clone: Data = { ...data };
			const store = setIdentifiable(key, data);

			const unsubscriber = subscribeStore(store, (newValue: any) => {
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
				onChange();
			});

			unsubscribers.push(unsubscriber);
			return [clone, unsubscribers];
		}
	};
}
