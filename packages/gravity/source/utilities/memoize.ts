/**
 * Memoize a single value
 */
export const memoize = <Callback extends (...args: any[]) => any>(
	callback: Callback,
) => {
	let result: ReturnType<Callback>;
	let memoized = false;

	return function (...args: Parameters<Callback>): ReturnType<Callback> {
		if (!memoized) {
			result = callback(...args);
			memoized = true;
		}
		return result;
	};
};
