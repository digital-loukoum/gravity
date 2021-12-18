/**
 * @return a unique key from an api call - or null if couldn't create a key from parameters
 */
export function getCacheKey(
	service: string,
	operation: string,
	properties: unknown[]
): string | null {
	try {
		return `${service}:${operation}:${JSON.stringify(properties)}`
	} catch (error) {
		// error happened during JSON stringification (ex: recursive value)
		return null
	}
}
