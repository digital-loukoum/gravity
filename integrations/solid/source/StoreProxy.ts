import type { BaseService, BaseServiceConstructor } from "@digitak/gravity";
import { Store } from "./Store.js";

/**
 * ⛔️ Because Typescript does not support type injection (ie passing a generic as a generic paremeter),
 * we can't be DRY and this code has to be repeated for every Api.ts + StoreProxy.ts file.
 * If you have to modify Api.ts or any StoreProxy.ts of the compatible front-end frameworks,
 * please make sure to modify all other Api.ts and StoreProxy.ts files.
 */

/**
 * Transforms a type into a callable type:
 * - the return of functions are promisified
 * - values are transformed into functions with no argument that return a promise of the value
 * with nested capabilities
 */
type Callable<Type> = Type extends (
	...args: infer Parameters
) => infer ReturnType
	? (...args: Parameters) => Store<ReturnType>
	: Type extends any[]
	? Array<() => Store<Type[number]>> & (() => Store<Type>)
	: Type extends
			| Set<any>
			| Map<any, any>
			| RegExp
			| String
			| Number
			| BigInt
			| Boolean
			| Date
			| ArrayBuffer
	? () => Store<Type>
	: Type extends object
	? { [Key in keyof Type]: Callable<Type[Key]> }
	: () => Store<Type>;

type ExposedProperties<Service extends BaseService> = {
	[Key in Exclude<
		keyof Service,
		"context" | `${"$" | "_"}${string}`
	>]: Callable<Service[Key]>;
};

export type StoreProxy<
	Services extends Record<string, BaseServiceConstructor>,
> = {
	[Key in keyof Services]: ExposedProperties<InstanceType<Services[Key]>>;
};
