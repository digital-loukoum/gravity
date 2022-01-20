import { isObject } from "./isObject";

export type Narrower = {
	[key: string]: true | Narrower;
};

export function narrow<Type extends Record<string, any>>(
	value: any,
	narrower?: Narrower | null,
): Type {
	if (!narrower) return value;

	const narrowed: Record<string, any> = {};

	if (!value) {
		for (const key in narrower) {
			const itemNarrower = narrower[key];
			if (isObject(itemNarrower)) {
				narrowed[key] = { select: narrow(null, itemNarrower) };
			} else if (itemNarrower) narrowed[key] = true;
		}
	}

	// object is not empty and needs to be narrowed
	for (const key in value) {
		const itemNarrower = narrower[key];
		if (!itemNarrower) continue;
		let item = value[key];

		if (typeof itemNarrower == "object") {
			if (typeof item == "object") {
				item.select = narrow(item.select, itemNarrower);
			} else {
				item = {
					select: narrow(null, itemNarrower),
				};
			}
		}

		narrowed[key] = item;
	}

	return narrowed as Type;
}
