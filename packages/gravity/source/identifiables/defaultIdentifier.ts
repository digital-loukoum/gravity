import type { Identify } from "./Identify.js";

/**
 * Default identifier function to detect unique objects.
 */
export const defaultIdentifier: Identify = (data: any) =>
	typeof data?.id == "string" ? data.id : undefined;
