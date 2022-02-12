/**
 * @return a simple proxy that takes no target and has only a getter
 */
export const proxy = <T = unknown>(getter: (property: string) => any) =>
	new Proxy({}, { get: (_, property) => getter(String(property)) }) as T;
