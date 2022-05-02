import { assertNotPromise } from "../utilities/assertNotPromise.js";

/**
 * Guard a whole object instance.
 * Should be used inside a class constructor.
 * @example constructor() { return guard(this, MyGuard) }
 */
export function guard<Target extends object>(
	target: Target,
	...guards: Array<(instance: Target) => any>
): Target {
	return new Proxy(target, {
		get(target, key) {
			guards.forEach((guard) => assertNotPromise(guard(target)));
			return (target as any)[key];
		},
	});
}
