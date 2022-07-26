import { writable, type Writable } from "svelte/store";

export const identifiables = new Map<string, Writable<unknown>>();

export function getIdentifiable(id: string): undefined | Writable<unknown> {
	return identifiables.get(id);
}

export function setIdentifiable<Value>(
	id: string,
	value: Value,
): Writable<Value> {
	let store = identifiables.get(id) as Writable<Value> | undefined;
	if (store) {
		store.set(value);
	} else {
		store = writable(value);
		identifiables.set(id, store);
	}
	return store;
}
