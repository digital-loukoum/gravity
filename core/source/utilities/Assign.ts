export function Assign<Constructor extends new (...args: any[]) => any, Object>(
	constructor: Constructor,
	object: Object,
	name = `Extended${constructor.name}`,
): new (
	...args: ConstructorParameters<Constructor>
) => InstanceType<Constructor> & Object {
	// @ts-ignore
	const newConstructor: any = class extends constructor {
		constructor(...args: ConstructorParameters<Constructor>) {
			super(...args);
			Object.assign(this, object);
		}
	};
	newConstructor.name = name;
	return newConstructor;
}
