export const isBrowser = (): boolean =>
	typeof window !== "undefined" &&
	globalThis === window &&
	typeof document !== "undefined";
