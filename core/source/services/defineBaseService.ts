import { BaseService } from "./BaseService";

export function defineBaseService<
	Context,
	Service extends BaseService<Context>,
>(serviceConstructor: new (context: Context) => Service) {
	return Object.assign(serviceConstructor, {
		with: <O extends object>(
			object: O,
		): new (context: Context) => O & Service => {
			// @ts-ignore
			return class extends serviceConstructor {
				constructor(public context: Context) {
					super(context);
					Object.assign(this, object);
				}
			};
		},
	});
}
