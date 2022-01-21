export function AssignPrototype<
	Constructor extends new (...args: any[]) => any,
	Object,
>(
	constructor: Constructor,
	prototype: object,
	name = `Extended${constructor.name}`,
): new (
	...args: ConstructorParameters<Constructor>
) => InstanceType<Constructor> & Object {
	// @ts-ignore
	const newConstructor: any = class extends constructor {};
	Object.assign(newConstructor.prototype, prototype);
	return newConstructor;
}
