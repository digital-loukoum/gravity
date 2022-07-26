/**
 * @param object the object to identify (or not)
 * @return undefined if the object is not unique, or a unique key to identify the object
 * If an object is identifiable through several keys (for example "name" + "type"),
 * the returned key must be computed from these values.
 */
export type Identifiables = {
	getKey: ((object: object) => string | undefined),
	set: (key: string, value: object) => any,
}

