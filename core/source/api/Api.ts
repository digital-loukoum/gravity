import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import type { Instance } from "../types/Instance";
import { Promisify } from "../types/Promisify";

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
	? () => Promise<Type>
	: Type extends object
	? { [Key in keyof Type]: Callable<Type[Key]> }
	: () => Promise<Type>;

export type Api<Services extends Record<string, BaseServiceConstructor>> = {
	[Key in keyof Services]: Callable<Instance<Services[Key]>>;
};
