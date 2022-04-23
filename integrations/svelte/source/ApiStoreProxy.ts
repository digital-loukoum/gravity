import type {
	BaseService,
	BaseServiceConstructor,
	ApiResponse,
} from "@digitak/gravity";
import type { Promisify } from "@digitak/gravity/types/Promisify.js";
import { ApiStore } from "./ApiStore.js";

/**
 * ⛔️ Because Typescript does not support type injection (ie passing a generic as a generic paremeter),
 * we can't be DRY and this code has to be repeated for every Api.ts + ApiStore.ts file.
 * If you have to modify Api.ts or any ApiStore.ts of the compatible front-end frameworks,
 * please make sure to modify all other Api.ts and ApiStore.ts files.
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
	? (...args: Parameters) => Promisify<ApiResponse<ReturnType>>
	: Type extends any[]
	? Array<() => Promise<ApiStore<Type[number]>>> &
			(() => Promise<ApiStore<Type>>)
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
	? () => Promise<ApiStore<Type>>
	: Type extends object
	? { [Key in keyof Type]: Callable<Type[Key]> }
	: () => Promise<ApiStore<Type>>;

type ExposedProperties<Service extends BaseService> = {
	[Key in Exclude<
		keyof Service,
		"context" | `${"$" | "_"}${string}`
	>]: Callable<Service[Key]>;
};

export type ApiStoreProxy<
	Services extends Record<string, BaseServiceConstructor>,
> = {
	[Key in keyof Services]: ExposedProperties<InstanceType<Services[Key]>>;
};
