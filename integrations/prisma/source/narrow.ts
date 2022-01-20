import { isObject } from "./isObject";

export type Narrower = {
	[key: string]: boolean | Narrower;
};

export function narrow<Type extends Record<string, any>>(
	value: any,
	narrower?: Narrower | null,
): Type {
	console.log("\nNarrowing", value, "with", narrower);
	if (!narrower) return value;

	const narrowed: Record<string, any> = {};

	// if we have an empty object but a narrower
	if (!isObject(value) || Object.keys(value).length == 0) {
		console.log("!!");
		if (Object.keys(narrower).length == 0) return value;

		for (const key in narrower) {
			const itemNarrower = narrower[key];

			if (itemNarrower === false) continue;
			else if (typeof itemNarrower == "object") {
				narrowed[key] = { select: narrow(null, itemNarrower) };
			} else {
				narrowed[key] = true;
			}
		}
	}

	// object is not empty and needs to be narrowed
	else {
		for (const key in value) {
			const itemNarrower = narrower[key];
			if (itemNarrower === false) continue;
			const item = value[key];

			narrowed[key] = item;

			if (typeof item == "object" && typeof itemNarrower == "object") {
				console.log("super narrowing", item, itemNarrower);
				item.select = narrow(item.select, itemNarrower);
			}
		}
	}

	console.log("-> ", narrowed, "\n");
	return narrowed as Type;
}
