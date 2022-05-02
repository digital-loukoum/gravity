/**
 * Shallow merge an arbitrary number of objects.
 * Later objects have priority over earlier ones.
 * Undefined values are ignored.
 */
export function merge<T extends Record<string, unknown>>(
	...objects: Array<unknown>
): T {
	const result: Record<string, unknown> = {};

	for (const object of objects) {
		if (!object || typeof object != "object") continue;
		for (const key in object) {
			if ((object as any)[key] !== undefined) {
				result[key] = (object as any)[key];
			}
		}
	}

	return result as T;
}
