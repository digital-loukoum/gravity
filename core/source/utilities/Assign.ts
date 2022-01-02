export function Assign<Constructor extends new (...args: any[]) => any, Object>(
	constructor: Constructor,
	object: Object,
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
	return newConstructor;
}
