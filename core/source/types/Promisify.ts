// transform a type into a promise of this type
// if the type was already a promise, do nothing
export type Promisify<Type> = Type extends Promise<infer Subtype>
	? Promise<Subtype>
	: Promise<Type>;
