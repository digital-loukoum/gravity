import { isObject } from "./isObject.js";

/**
 * Deep merge two objects.
 * In case of a common key, *source* overwrites *target*.
 */
export function merge(
	target: Record<string, any>,
	source: Record<string, any>,
) {
	if (!source) return target;
	const merged: Record<string, any> = {};

	for (const key in source) {
		if (isObject(source[key]) && isObject(target[key])) {
			merged[key] = merge(target[key], source[key]);
		} else {
			merged[key] = source[key];
		}
	}

	for (const key in target) {
		if (!(key in merged)) {
			merged[key] = target[key];
		}
	}

	return merged;
}
