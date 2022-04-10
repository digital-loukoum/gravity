import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import type { Promisify } from "../types/Promisify.js";
import type { ApiResponse } from "./ApiResponse.js";

/**
 * Transforms a type into a callable type:
 * - the return of functions are promisified
 * - values are transformed into functions with no argument that return a promise of the value
 * with nested capabilities
 */
type Callable<Type> = Type extends (
	...args: infer Parameters
) => infer ReturnType
	? (...args: Parameters) => Promisify<ReturnType>
	: Type extends
			| any[]
			| Set<any>
			| Map<any, any>
			| RegExp
			| String
			| Number
			| BigInt
			| Boolean
			| Date
			| ArrayBuffer
	? () => Promise<ApiResponse<Type>>
	: Type extends object
	? {
			[Key in keyof Type as Exclude<Key, `${"$" | "_"}${string}`>]: Callable<
				Type[Key]
			>;
	  }
	: () => Promise<ApiResponse<Type>>;

export type Api<Services extends Record<string, BaseServiceConstructor>> = {
	[Key in keyof Services]: Callable<InstanceType<Services[Key]>>;
};
