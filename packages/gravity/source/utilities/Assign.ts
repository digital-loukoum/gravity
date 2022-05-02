export function Assign<Constructor extends new (...args: any[]) => any, Object>(
	constructor: Constructor,
	object: Object,
	name = `Extended${constructor.name}`,
): new (
	...args: ConstructorParameters<Constructor>
) => InstanceType<Constructor> & Object {
	// @ts-ignore
	const newConstructor = class extends constructor {
		constructor(...args: ConstructorParameters<Constructor>) {
			super(...args);
			for (const key in object) {
				const value = object[key];
				this[key] = typeof value === "function" ? value.bind(this) : value;
			}
			Object.assign(this, object);
		}
	};
	return newConstructor;
}
