import type { GravityStream, ServiceInterface } from "@digitak/gravity";
import type { ServicesRecord } from "@digitak/gravity";
import { StoreData } from "@digitak/gravity/store/StoreData";

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
	? ReturnType extends
			| GravityStream<infer Result>
			| Promise<GravityStream<infer Result>>
		? (...args: Parameters) => StoreData<AsyncIterable<Result>>
		: (...args: Parameters) => StoreData<ReturnType>
	: Type extends any[]
		? Array<() => StoreData<Type[number]>> & (() => StoreData<Type>)
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
			? () => StoreData<Type>
			: Type extends object
				? { [Key in keyof Type]: Callable<Type[Key]> }
				: () => StoreData<Type>;

type ExposedProperties<Service extends ServiceInterface<any>> = {
	[Key in Exclude<
		keyof Service,
		"context" | `${"$" | "_"}${string}`
	>]: Callable<Service[Key]>;
};

export type StoreProxy<Services extends ServicesRecord<any>> = {
	[Key in keyof Services]: ExposedProperties<InstanceType<Services[Key]>>;
};
